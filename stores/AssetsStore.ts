import { SubmittableExtrinsic } from '@polkadot/api/types'
import Consola from 'consola'

const logger = Consola.create({
  defaults: {
    tag: 'store::assets:',
  },
})

/// TODO: Import from paraspell in later release!!!
export const NODE_NAMES = [
  'Statemint',
  'Acala',
  'Astar',
  'BifrostPolkadot',
  'Bitgreen',
  'Centrifuge',
  'Clover',
  'ComposableFinance',
  'Darwinia',
  'HydraDX',
  'Interlay',
  'Kylin',
  'Litentry',
  'Moonbeam',
  'Parallel',
  'Statemine',
  'Encointer',
  'Altair',
  'Amplitude',
  'Bajun',
  'Basilisk',
  'BifrostKusama',
  'Pioneer',
  'Calamari',
  'CrustShadow',
  'Crab',
  'Dorafactory',
  'Imbue',
  'Integritee',
  'InvArchTinker',
  'Karura',
  'Kico',
  'Kintsugi',
  'Listen',
  'Litmus',
  'Mangata',
  'Moonriver',
  'ParallelHeiko',
  'Picasso',
  'Pichiu',
  'Quartz',
  'Robonomics',
  'Shiden',
  'Turing',
] as const

export type Extrinsic = SubmittableExtrinsic<'promise'>
export type TNode = typeof NODE_NAMES[number]
export type TAssetDetails = {
  assetId: string
  symbol: string
}
export type TNodeAssets = {
  relayChainAssetSymbol: 'KSM' | 'DOT'
  nativeAssets: string[]
  otherAssets: TAssetDetails[]
}

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
    async send(balance: number, selectedAsset: TAssetDetails, forMe: boolean) {
      //TODO: send transaction
      //TODO: Currentlty not implemented on paraspell side
      const decimals = 10
      logger.success('send', balance * 10 ** decimals, selectedAsset, forMe)
    },
  },
  getters: {
    nodeOptions: (state) => {
      return NODE_NAMES.map((name) => ({ value: name, label: name }))
    },
    assetOptions:
      (state) =>
      (node: TNode): TAssetDetails[] => {
        const { $paraspell } = useNuxtApp()
        // check if assets are loaded
        if (!state.assets) return []
        return [
          ...state.assets.nativeAssets
            .filter(
              // Filter out only usable native assets
              (asset) => $paraspell.assets.hasSupportForAsset(node, asset)
            )
            .reduce((acc, value) => {
              acc.push({ assetId: 'native', symbol: value })
              return acc
            }, [] as TAssetDetails[]),
          ...state.assets.otherAssets.filter(
            // Filter out only usable other assets
            (asset) => $paraspell.assets.hasSupportForAsset(node, asset.symbol)
          ),
        ]
      },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssetsStore, import.meta.hot))
}
