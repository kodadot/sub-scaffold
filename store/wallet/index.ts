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
    async fetchWallets() {
      if (isWeb3Injected) {
        throw 'Test'
        this.wallets = await web3Accounts()
      }
    },
  },
})
