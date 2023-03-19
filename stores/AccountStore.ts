import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import consola from 'consola'

const logger = consola.create({
  defaults: {
    tag: 'store::account:',
  },
})
export const DEVELOPMENT_ACCOUNTS = [
  'Alice',
  'Bob',
  'Charlie',
  'Dave',
  'Eve',
  'Ferdie',
] as const
export interface Account extends InjectedAccountWithMeta {
  id: number
  dev?: boolean
}

type State = {
  accounts: Account[]
  selected: Account | null
  idCounter: number
}

export const useAccountStore = defineStore({
  id: 'account',
  state: (): State => ({
    accounts: [],
    selected: null,
    idCounter: 0,
  }),
  actions: {
    /**
     * Set the list of accounts from the API
     */
    setAccounts(accounts: InjectedAccountWithMeta[]) {
      this.accounts = [
        ...accounts.map((acc) => ({
          id: this.idCounter++,
          ...acc,
        })),
        ...DEVELOPMENT_ACCOUNTS.map((acc) => ({
          id: this.idCounter++,
          dev: true,
          address: '//' + acc,
          meta: {
            source: acc,
            name: acc,
          },
        })),
      ]
    },
    /**
     * Disconnect current account
     */
    disconnectAccount() {
      this.selected = null
    },
    /**
     * Set current account
     */
    selectAccount(id: number): void {
      const selected = this.accounts.find((w) => w.id === id)
      if (!selected) {
        logger.error('Cannot locate this account', id, this.accounts)
        return
      }
      this.selected = selected
    },
    /**
     * Set development account
     */
    selectDevAccount(id: number): void {
      const selected = this.accounts.find((w) => w.id === id)
      if (!selected) {
        logger.error('Cannot locate this account', id, this.accounts)
        return
      }
      this.selected = selected
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
