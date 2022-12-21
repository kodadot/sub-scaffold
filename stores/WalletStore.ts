import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import Consola from 'consola'

const logger = Consola.create({
  defaults: {
    tag: 'store::wallet:',
  },
})
type State = {
  wallets: InjectedAccountWithMeta[]
  selected: InjectedAccountWithMeta | null
}

export const useWalletStore = defineStore({
  id: 'wallet',
  state: (): State => ({
    wallets: [],
    selected: null,
  }),
  actions: {
    /**
     * Fetches the list of wallets from the API
     */
    setWallets(wallets: InjectedAccountWithMeta[]) {
      this.wallets = wallets
    },
    /**
     * Disconnect current wallet
     */
    disconnectWallet() {
      this.selected = null
    },
    /**
     * Set current wallet
     */
    selectWallet(address: string): void {
      const selected = this.wallets.find((w) => w.address === address)
      if (!selected) {
        logger.error('Cannot locate this wallet', address, this.wallets)
        return
      }
      this.selected = selected as InjectedAccountWithMeta
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWalletStore, import.meta.hot))
}
