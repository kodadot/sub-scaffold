import * as paraspell from '@paraspell/sdk'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      paraspell,
    },
  }
})
