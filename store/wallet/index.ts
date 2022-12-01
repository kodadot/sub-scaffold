import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { defineStore } from 'pinia'

const logger = createLogger('store::wallet')

type State = {
  wallets: InjectedAccountWithMeta[]
  selected?: InjectedAccountWithMeta
}

export const useWalletStore = defineStore('wallet', {
  state: (): State => ({
    wallets: [],
  }),
  actions: {
    /**
     * Fetches the list of wallets from the API
     */
    async setWallets(wallets: InjectedAccountWithMeta[]) {
      this.wallets = wallets
    },
    /**
     * Set current wallet
     */
    selectWallet(address: string) {
      this.selected = this.wallets.find((w) => w.address === address)
      if (!this.selected) {
        logger.error('Cannot locate wallet with ID: ' + address)
        throw new Error('Cannot locate this wallet')
      }
    },
  },
})
