import { ApiPromise, WsProvider } from '@polkadot/api'
import { TypeRegistry } from '@polkadot/types/create'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { defineStore } from 'pinia'

const logger = createLogger('store::substrate')

type ConnectionState = 'INIT' | 'CONNECTING' | 'READY' | 'ERROR'

type State = {
  socket: string
  jsonrpc: typeof jsonrpc
  api?: ApiPromise
  apiState?: ConnectionState
  apiError?: Error
  typeRegistry: TypeRegistry
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
    connect() {
      if (this.apiState) {
        logger.error('You are alredy connected')
        return
      }
      logger.success(`Connect to socket: ${this.socket}`)

      const provider = new WsProvider(this.socket)
      const _api = new ApiPromise({ provider, rpc: this.jsonrpc })

      // Set listeners for disconnection and reconnection event.
      _api.on('connected', () => {
        this.setConnectionState('CONNECTING', _api)
        // `ready` event is not emitted upon reconnection and is checked explicitly here.
        _api.isReady.then((_api) => this.setConnectionState('READY'))
      })
      _api.on('ready', () => this.setConnectionState('READY'))
      _api.on('error', (err) => this.setConnectionState('ERROR', err))
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
  },
})
