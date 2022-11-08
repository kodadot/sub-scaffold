import { apiFetch } from '@/utils/omf'
import { defineStore } from 'pinia'
import Consola, { FancyReporter } from 'consola'
import { FetchError } from 'ohmyfetch'

const logger = Consola.create({
  defaults: {
    tag: 'store::default:',
  },
})

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
