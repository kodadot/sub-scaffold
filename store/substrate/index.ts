import { ApiPromise, WsProvider } from '@polkadot/api'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { defineStore } from 'pinia'

type ConnectionState = 'INIT' | 'CONNECTING' | 'READY' | 'ERROR'

type State = {
  socket: string
  jsonrpc: typeof jsonrpc
  api?: ApiPromise
  apiState?: ConnectionState
  apiError?: Error
}
const useSubstrateStore = defineStore({
  id: 'substrate',
  state: (): State => ({
    socket: import.meta.env.VITE_WS_PROVIDER as string,
    jsonrpc,
  }),
  actions: {
    setConnectionState(state: ConnectionState, payload?: ApiPromise | Error) {
      this.apiState = state
      switch (state) {
        case 'CONNECTING':
          this.api = payload as ApiPromise
          break
        case 'ERROR':
          this.apiError = payload as Error
          break
      }
    },
    connect() {
      console.log(`Connected socket: ${this.socket}`)
      const provider = new WsProvider(this.socket)
      const _api = new ApiPromise({ provider, rpc: this.jsonrpc })

      // Set listeners for disconnection and reconnection event.
      _api.on('connected', () => {
        this.setConnectionState('CONNECTING', _api)
        // `ready` event is not emitted upon reconnection and is checked explicitly here.
        _api.isReady.then((_api) => this.setConnectionState('READY'))
      })
      _api.on('ready', () => this.setConnectionState('READY'))
      _api.on('error', (err) => this.setConnectionState('ERROR', err))
    },
  },
})
