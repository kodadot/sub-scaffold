import { NODE_NAMES, TAssetDetails, TNode, TNodeAssets } from '@paraspell/sdk'
import Consola from 'consola'

const logger = Consola.create({
  defaults: {
    tag: 'store::assets:',
  },
})

type State = {
  assets: TNodeAssets | null
}

export const useAssetsStore = defineStore({
  id: 'assets',
  state: (): State => ({
    assets: null,
  }),
  actions: {
    /**
     * Select node to show assets
     * @param node
     */
    selectNode(node: TNode | null) {
      if (!node) {
        this.assets = null
        return
      }
      const { $paraspell } = useNuxtApp()
      this.assets = $paraspell.assets.getAssetsObject(node)
    },
    /**
     * Send a transaction
     * @param balance Amount of tokens
     * @param currencyId Token ID
     */
    async send(
      balance: number,
      selectedAsset: TAssetDetails,
      forMe: boolean,
      source: string,
      destination: string
    ) {
      //TODO: Decimals currentlty not implemented on paraspell side
      const decimals = 12
      logger.success(
        `send ${source} => ${destination}`,
        balance * 10 ** decimals,
        selectedAsset,
        forMe
      )
    },
  },
  getters: {
    nodeOptions: (state) => {
      return NODE_NAMES.map((name) => ({ value: name, label: name }))
    },
    assetOptions: (state): TAssetDetails[] => {
      // check if assets are loaded
      if (!state.assets) return []
      return [
        ...state.assets.nativeAssets.reduce((acc, value) => {
          acc.push({ assetId: 'native', symbol: value })
          return acc
        }, [] as TAssetDetails[]),
        ...state.assets.otherAssets,
      ]
    },
    destinationOptions: (state) => (symbol: string, currentNode: string) => {
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
