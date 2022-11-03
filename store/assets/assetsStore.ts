import { defineStore } from 'pinia'

type Currency = {
  id: string
  name: string
  decimals: number
}

type State = {
  currencies: Currency[]
}

export const useAssetsStore = defineStore({
  id: 'assets',
  state: (): State => ({
    currencies: [],
  }),
  actions: {
    async fetchCurrencies() {
      this.currencies = [
        { id: 'dot', name: 'DOT', decimals: 10 },
        { id: 'ksm', name: 'KSM', decimals: 12 },
        { id: 'bsx', name: 'BSX', decimals: 14 },
      ]
    },
    async send(balance: number, currencyId: string) {
      const decimals =
        this.currencies.find((c) => c.id === currencyId)?.decimals ?? 1
      console.log('send', balance * 10 ** decimals, currencyId)
    },
  },
})
