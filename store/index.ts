import { defineStore } from 'pinia'
import { Prefix } from '~~/types/config'

type State = {
  urlPrefix?: Prefix
}

export const useMainStore = defineStore('index', {
  state: (): State => ({}),
  actions: {},
  getters: {
    // if you need you can implement your prefix
    currentUrlPrefix(): Prefix | undefined {
      return this.urlPrefix
    },
  },
})
