// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  ssr: false,
  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api',
      API_BASE_URL: process.env.API_BASE_URL,
      ETH_CHAIN_ID: process.env.ETH_CHAIN_ID,
      ETH_CHAIN_NAME: process.env.ETH_CHAIN_NAME,
      ETH_NATIVE_CURRENCY_NAME: process.env.ETH_NATIVE_CURRENCY_NAME,
      ETH_NATIVE_CURRENCY_SYMBOL: process.env.ETH_NATIVE_CURRENCY_SYMBOL,
      ETH_NATIVE_CURRENCY_DECIMALS: process.env.ETH_NATIVE_CURRENCY_DECIMALS,
      ETH_USER_WALLET_CHAIN_RPC: process.env.ETH_USER_WALLET_CHAIN_RPC,
    },
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
  ],
  imports: {
    dirs: ['stores'],
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
          ]
        : ['@juggle/resize-observer'],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
    },
  },
})
