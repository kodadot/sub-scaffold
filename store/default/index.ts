import { apiFetch } from '@/utils/omf'
import { FetchError } from 'ohmyfetch'
import { defineStore } from 'pinia'

const logger = createLogger('store::default')

export const useDefaultStore = defineStore('default', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment(by?: number) {
      this.count += by || 1
    },
    async apiCall() {
      try {
        logger.info(await apiFetch('/counter'))
      } catch (e) {
        if (e instanceof FetchError) {
          return logger.error(e.message)
        }
        logger.error(e)
      }
    },
  },
})
