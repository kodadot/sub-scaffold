import { cryptoWaitReady } from '@polkadot/util-crypto'

export default defineNuxtPlugin(() => {
  cryptoWaitReady()
})
