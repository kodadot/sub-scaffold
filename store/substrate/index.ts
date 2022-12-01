import { ApiPromise, WsProvider } from '@polkadot/api'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { TypeRegistry } from '@polkadot/types/create'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { keyring as Keyring } from '@polkadot/ui-keyring'
import { isTestChain } from '@polkadot/util'
import { defineStore } from 'pinia'

const logger = createLogger('store::substrate')

type ConnectionState = 'INIT' | 'CONNECTING' | 'READY' | 'ERROR'

type KeyringState = 'LOADING' | 'READY' | 'ERROR'

type State = {
  socket: string
  jsonrpc: typeof jsonrpc
  api?: ApiPromise
  apiState?: ConnectionState
  apiError?: Error
  typeRegistry: TypeRegistry
  keyring?: typeof Keyring
  keyringState?: KeyringState
}
export const useSubstrateStore = defineStore('substrate', {
  state: (): State => ({
    socket: import.meta.env.VITE_WS_PROVIDER as string,
    typeRegistry: new TypeRegistry(),
    jsonrpc,
  }),
  actions: {
    setConnectionState(state: ConnectionState, payload?: ApiPromise | Error) {
      this.apiState = state
      switch (state) {
        case 'INIT':
          logger.info('Initial connection to socket')
          break
        case 'CONNECTING':
          this.api = payload as ApiPromise
          logger.info('Trying to connect to socket')
          break
        case 'ERROR':
          this.apiError = payload as Error
          logger.error('Problem with socket connection', payload)
          break
        case 'READY':
          logger.success('Connected to socket')
          break
        default:
          logger.error('Unknown action')
      }
    },
    async connect() {
      if (this.apiState) {
        logger.error('You are alredy connected')
        return
      }
      logger.success(`Connect to socket: ${this.socket}`)

      const provider = new WsProvider(this.socket)
      try {
        const _api = await ApiPromise.create({ provider, rpc: this.jsonrpc })
        this.setConnectionState('CONNECTING', _api)
        await _api.isReady
        this.setConnectionState('READY')
      } catch (err) {
        this.setConnectionState('ERROR', err as Error)
      }
    },

    async retrieveChainInfo() {
      if (!this.api) {
        logger.error('You are not connected to chain')
        return Promise.reject('You are not connected to chain')
      }
      logger.info('Trying to retrieve chain info')
      const [systemChain, systemChainType] = await Promise.all([
        this.api.rpc.system.chain(),
        this.api.rpc.system.chainType
          ? this.api.rpc.system.chainType()
          : Promise.resolve(this.typeRegistry.createType('ChainType', 'Live')),
      ])

      return {
        systemChain: (systemChain || '<unknown>').toString(),
        systemChainType,
      }
    },

    setKeyringState(state: KeyringState, payload?: typeof Keyring | Error) {
      this.keyringState = state
      switch (state) {
        case 'LOADING':
          logger.info('Keyring is loading')
          break
        case 'READY':
          this.keyring = payload as typeof Keyring
          logger.success('Keyring is ready')
          break
        case 'ERROR':
          delete this.keyring
          logger.error('Error while loading keyring ' + payload)
          break
      }
    },
    async loadAccounts() {
      this.setKeyringState('LOADING')

      try {
        await web3Enable(import.meta.env.VITE_DAPP_NAME as string)
        let allAccounts = await web3Accounts()

        allAccounts = allAccounts.map(({ address, meta }) => ({
          address,
          meta: { ...meta, name: `${meta.name} (${meta.source})` },
        }))

        // Logics to check if the connecting chain is a dev chain, coming from polkadot-js Apps
        // ref: https://github.com/polkadot-js/apps/blob/15b8004b2791eced0dde425d5dc7231a5f86c682/packages/react-api/src/Api.tsx?_pjax=div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20%3E%20main#L101-L110
        const { systemChain, systemChainType } = await this.retrieveChainInfo()
        const isDevelopment =
          systemChainType.isDevelopment ||
          systemChainType.isLocal ||
          isTestChain(systemChain)

        Keyring.loadAll({ isDevelopment }, allAccounts)

        this.setKeyringState('READY', Keyring)
      } catch (e) {
        this.setKeyringState('ERROR')
      }
    },
  },
})
