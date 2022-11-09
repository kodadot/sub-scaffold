import { Wallet } from '@/types/wallets'
import { defineStore } from 'pinia'

type State = {
  wallets: Wallet[]
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
      //TODO: fetch wallets from API
      this.wallets = [
        { id: 'pdjs', name: 'PolkadotJS' },
        { id: 'talisman', name: 'Talisman' },
        { id: 'subw', name: 'SubWallet' },
      ]
    },
  },
})
