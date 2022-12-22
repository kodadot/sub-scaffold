import { Prefix } from '@/types/config'

type State = {
  urlPrefix?: Prefix
}

export const useMainStore = defineStore({
  id: 'main',
  state: (): State => ({}),
  actions: {},
  getters: {
    // if you need you can implement your prefix
    currentUrlPrefix(): Prefix | undefined {
      return this.urlPrefix
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
