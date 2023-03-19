import {
  Extrinsic,
  NODE_NAMES,
  TAssetDetails,
  TNode,
  TNodeAssets,
} from '@paraspell/sdk'
import {
  ApiPromise,
  Keyring,
  WsProvider,
  type SubmittableResult,
} from '@polkadot/api'
import { web3FromAddress } from '@polkadot/extension-dapp'
import consola from 'consola'
import { DestinationOption, SupportedNode } from '~~/utils/nodes'

const logger = consola.create({
  defaults: {
    tag: 'store::assets:',
  },
})
type Nodes = Record<SupportedNode, string>

const NODES_MAP: Nodes = {
  BifrostKusama: 'ws://127.0.0.1:9995',
  Karura: 'ws://127.0.0.1:9999',
  Pichiu: 'ws://127.0.0.1:9991',
}
/**
 * Shortcuts are standing for:
 * PtP -> Para to Para
 * RtP -> Relay to Para
 * PtR -> Para to Relay
 */
export type TransferType = 'PtP' | 'RtP' | 'PtR'

type State = {
  assets: TNodeAssets | null
  activeTransaction: boolean
}

export const useAssetsStore = defineStore({
  id: 'assets',
  state: (): State => ({
    assets: null,
    activeTransaction: false,
  }),
  actions: {
    /**
     * Select node to show assets
     * @param node
     */
    selectNode(node: TNode | null): void {
      const { $paraspell } = useNuxtApp()
      if (!node) {
        this.assets = {
          paraId: 1,
          relayChainAssetSymbol: 'KSM',
          nativeAssets: [{ symbol: 'KSM', decimals: 12 }],
          otherAssets: [],
        }
        return
      }
      this.assets = $paraspell.assets.getAssetsObject(node)
      if (
        node === 'Pichiu' &&
        !this.assets.nativeAssets.find((asset) => asset.symbol === 'KSM')
      ) {
        this.assets.nativeAssets.push({
          symbol: 'KSM',
          decimals: 12,
        })
      }
    },
    /**
     * Send a transaction
     * @param balance Amount of tokens
     * @param currencyId Token ID
     */
    async send(
      balance: number,
      selectedAsset: TAssetDetails,
      type: TransferType,
      source: SupportedNode,
      destination: SupportedNode,
      address?: string
    ): Promise<void> {
      const notificationStore = useNotificationStore()
      logger.info(
        balance * selectedAsset.decimals,
        selectedAsset,
        source,
        destination,
        address
      )
      if (this.activeTransaction) {
        logger.error('There is already an active transaction')
        notificationStore.create(
          'Active transaction',
          'There is already an active transaction, please wait',
          NotificationType.Error
        )
        return
      }
      this.activeTransaction = true
      const { $paraspell } = useNuxtApp()
      const accountStore = useAccountStore()
      const wsProvider = new WsProvider(NODES_MAP[source])
      const api = await ApiPromise.create({ provider: wsProvider })
      const builder = $paraspell.Builder(api)
      let extrinsic: Extrinsic | null = null
      switch (type) {
        case 'PtP':
          extrinsic = builder
            .from(source)
            .to(destination)
            .currency(selectedAsset.symbol)
            .amount(balance * 10 ** selectedAsset.decimals)
            .address(address ?? accountStore.selected!.address)
            .build()
          break
        case 'RtP':
          extrinsic = builder
            .to(destination)
            .amount(balance * 10 ** selectedAsset.decimals)
            .address(address ?? accountStore.selected!.address)
            .build()
          break
        case 'PtR':
          extrinsic = builder
            .from(source)
            .currency(selectedAsset.symbol)
            .amount(balance * 10 ** selectedAsset.decimals)
            .address(address ?? accountStore.selected!.address)
            .build()
          break
      }

      if (!accountStore.selected) {
        return
      }
      if (accountStore.selected.dev) {
        const keyring = new Keyring({ type: 'sr25519' })
        await extrinsic.signAndSend(
          keyring.createFromUri(accountStore.selected.address),
          this.handleTransactionUpdate
        )
      } else {
        const injector = await web3FromAddress(accountStore.selected.address)
        await extrinsic.signAndSend(
          accountStore.selected.address,
          { signer: injector.signer },
          this.handleTransactionUpdate
        )
      }

      logger.success(
        `send ${source} => ${destination}`,
        balance * 10 ** selectedAsset.decimals,
        selectedAsset,
        type
      )
    },
    handleTransactionUpdate({ status, txHash }: SubmittableResult) {
      const notificationStore = useNotificationStore()
      logger.info(`Transaction hash is: ${txHash.toHex()}`)
      notificationStore.create(
        'Transaction',
        `Transaction hash is ${txHash.toHex()}`
      )
      if (status.isFinalized) {
        this.activeTransaction = false
        logger.success('Transaction finalized')
        notificationStore.create(
          'Transaction finalized',
          `Transaction finalized at blockHash ${status.asFinalized}`,
          NotificationType.Success
        )
      }
    },
  },
  getters: {
    /**
     * Getter for all available nodes
     * @returns Array of nodes
     */
    nodeOptions: (): DestinationOption[] => {
      return NODE_NAMES.map((name) => ({ value: name, label: name }))
    },
    /**
     * Getter for available assets based on selected node
     * @param state - store state
     * @returns Array of assets
     */
    assetOptions: (state): TAssetDetails[] => {
      // check if assets are loaded
      if (!state.assets) return []
      return [
        ...state.assets.nativeAssets.reduce((acc, value) => {
          acc.push({ assetId: 'native', ...value })
          return acc
        }, [] as TAssetDetails[]),
        ...state.assets.otherAssets,
      ]
    },
    /**
     * Getter for available destination nodes based on source and asset
     * @returns Updated function
     */
    destinationOptions:
      (): Function =>
      (symbol: string, currentNode: TNode | null): DestinationOption[] => {
        const { $paraspell } = useNuxtApp()
        return NODE_NAMES.filter(
          (node) =>
            node !== currentNode &&
            $paraspell.assets.hasSupportForAsset(node, symbol)
        ).map((name) => ({ value: name, label: name }))
      },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssetsStore, import.meta.hot))
}
