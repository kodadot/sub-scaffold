import { defineStore } from 'pinia'
import { Prefix } from '~~/types/config'

type State = {
  urlPrefix?: Prefix
}

export const useMainStore = defineStore({
  id: 'main',
  state: (): State => ({}),
  actions: {},
  getters: {
    currentUrlPrefix(): Prefix | undefined {
      return this.urlPrefix
    },
  },
})
