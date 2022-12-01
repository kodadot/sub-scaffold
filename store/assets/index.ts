import { Currency } from '@/types/currency'
import { defineStore } from 'pinia'

const logger = createLogger('store::assets')

type State = {
  currencies: Currency[]
}

export const useAssetsStore = defineStore('assets', {
  state: (): State => ({
    currencies: [],
  }),
  actions: {
    /**
     * Fetches the list of currencies from the API
     */
    async fetchCurrencies() {
      //TODO: fetch currencies from API
      this.currencies = [
        { id: 'dot', name: 'DOT', decimals: 10 },
        { id: 'ksm', name: 'KSM', decimals: 12 },
        { id: 'bsx', name: 'BSX', decimals: 14 },
      ]
    },
    /**
     * Send a transaction
     * @param balance Amount of tokens
     * @param currencyId Token ID
     */
    async send(balance: number, currencyId: string, forMe: boolean) {
      //TODO: send transaction
      const decimals =
        this.currencies.find((c) => c.id === currencyId)?.decimals ?? 1
      logger.success('send', balance * 10 ** decimals, currencyId, forMe)
    },
  },
})
