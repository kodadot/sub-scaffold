import { web3Accounts, isWeb3Injected } from '@polkadot/extension-dapp'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { defineStore } from 'pinia'

type State = {
  wallets: InjectedAccountWithMeta[]
  selected?: InjectedAccountWithMeta
}

export const useWalletStore = defineStore({
  id: 'wallet',
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
        throw new Error('Cannot locate this wallet')
      }
    },
  },
})
