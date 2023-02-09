import { Builder, TNode } from '@paraspell/sdk'
import {
  ApiPromise,
  Keyring,
  SubmittableResult,
  WsProvider,
} from '@polkadot/api'
import consola from 'consola'
const logger = consola.create({
  defaults: {
    tag: 'store::channel:',
  },
})

export interface Parachain {
  id: number
  name: TNode
}
type State = {
  parachains: Record<number, TNode>
  channels: Record<number, Array<number>>
  hasActiveClosing: boolean
  sourceInformed: boolean
  destinationInformed: boolean
  closingInformed: boolean
  apiConnected: boolean
}

export const useChannelStore = defineStore({
  id: 'channel',
  state: (): State => ({
    parachains: {},
    channels: [],
    apiConnected: false,
    hasActiveClosing: false,
    sourceInformed: false,
    destinationInformed: false,
    closingInformed: false,
  }),
  actions: {
    /**
     * Method to load availible parachains into the state
     */
    async loadParachains(): Promise<void> {
      const wsProvider = new WsProvider('ws://127.0.0.1:9944')
      const api = await ApiPromise.create({ provider: wsProvider })
      if (!api) return this.handleApiError()
      this.apiConnected = true

      // Call to query parachains connected to Relay chain
      const parachainsInfo =
        (await api.query.paras.parachains()) as unknown as Record<
          number,
          { words: Array<number> }
        >
      const parachains = {} as Record<number, TNode>
      for (const key in parachainsInfo) {
        if (!isNaN(Number(key))) {
          const chainId = parachainsInfo[key].words[0]
          // Here add your new node
          if (chainId === 2001) parachains[2001] = 'BifrostKusama'
          if (chainId === 2000) parachains[2000] = 'Karura'
          if (chainId === 2102) parachains[2102] = 'Pichiu'
        }
      }
      this.parachains = parachains
    },

    /**
     * Method to open channel between source and destination chain
     * @param source Source chain ID
     * @param destination Destination chain ID
     */
    async openChannel(source: number, destination: number): Promise<void> {
      const notificationStore = useNotificationStore()
      const wsProvider = new WsProvider('ws://127.0.0.1:9944')
      const api = await ApiPromise.create({ provider: wsProvider })
      if (!api) return this.handleApiError()
      if (this.hasActiveOpening) {
        notificationStore.create(
          'Error',
          'There is currently one channel opening, please wait',
          NotificationType.Error
        )
        return
      }
      logger.success(`Opening channel: ${source}<->${destination}`)
      this.apiConnected = true
      const keyring = new Keyring({ type: 'sr25519' })
      const alice = keyring.addFromUri('//Alice', { name: 'Alice default' })
      // API call used to open first HRMP channel
      Builder(api)
        .from(this.parachains[source])
        .to(this.parachains[destination])
        .openChannel()
        .maxSize(8)
        .maxMessageSize(1000)
        .build()
        .signAndSend(alice, (res) =>
          this.handleChannelOpening(res, true, source, destination)
        )
      await new Promise((resolve) => setTimeout(resolve, 10000))
      Builder(api)
        .from(this.parachains[destination])
        .to(this.parachains[source])
        .openChannel()
        .maxSize(8)
        .maxMessageSize(1000)
        .build()
        .signAndSend(alice, (res) =>
          this.handleChannelOpening(res, false, source, destination)
        )
    },

    /**
     * Method to handle chain responses when opening channel
     * @param result Result from chain
     * @param isSource Boolean to dermine what side of handler is this
     * @param source Source chain ID
     * @param destination Destination chain ID
     */
    handleChannelOpening(
      { status, txHash }: SubmittableResult,
      isSource: boolean,
      source: number,
      destination: number
    ): void {
      const notificationStore = useNotificationStore()
      if (!this.sourceInformed && isSource) {
        this.sourceInformed = true
        notificationStore.create(
          `Openning source channel`,
          `You will get notified about channel status soon. Transaction hash is ${txHash.toHex()}`
        )
      }
      if (!this.destinationInformed && !isSource) {
        this.destinationInformed = true
        notificationStore.create(
          `Openning destination channel`,
          `You will get notified about channel status soon. Transaction hash is ${txHash.toHex()}`
        )
      }
      if (status.isFinalized) {
        if (isSource) {
          this.sourceInformed = false
        } else {
          this.destinationInformed = false
        }
        if (!this.hasActiveOpening) {
          this.addNewChannel(source, destination)
        }
        logger.success(`${isSource ? 'Source' : 'Destination'} channel opened`)
        notificationStore.create(
          `${isSource ? 'Source' : 'Destination'} channel opened`,
          `${isSource ? 'Source' : 'Destination'} channel is opened` +
            `, it might take a few seconds to appear in close channel screen.`,
          NotificationType.Success
        )
      }
    },

    /**
     * Method to add new channel to list of active channels
     * @param source Source chain ID
     * @param destination Destination chain ID
     */
    addNewChannel(source: number, destination: number): void {
      if (!this.channels[source]) {
        this.channels[source] = []
      }
      if (
        this.channels[source]?.includes(destination) ||
        this.channels[destination]?.includes(source)
      ) {
        logger.warn('This channel is already registered')
        return
      }
      this.channels[source].push(destination)
      this.channels = { ...this.channels }
    },

    /**
     * Method to load active channels into the state
     */
    async loadChannels(): Promise<void> {
      const wsProvider = new WsProvider('ws://127.0.0.1:9944')
      const api = await ApiPromise.create({ provider: wsProvider })
      if (!api) return this.handleApiError()
      this.apiConnected = true
      const channels = await api.query.hrmp.hrmpChannels.entries()
      for (const channel in channels) {
        // Codec type is missing correct types so we need to provide them manualy
        const era = channels[channel][0].args[0] as unknown as {
          sender: { words: [number] }
          recipient: { words: [number] }
        }
        this.addNewChannel(era.sender.words[0], era.recipient.words[0])
      }
    },

    /**
     * Method for closing channel between chains
     * @param source Source chain ID
     * @param destination Destination chain ID
     */
    async closeChannelConnections(
      source: number,
      destination: number
    ): Promise<void> {
      const notificationStore = useNotificationStore()
      const wsProvider = new WsProvider('ws://127.0.0.1:9944')
      const api = await ApiPromise.create({ provider: wsProvider })
      if (!api) return this.handleApiError()
      this.apiConnected = true
      if (this.hasActiveClosing) {
        notificationStore.create(
          'Error',
          'There is currently one channel closing, please wait',
          NotificationType.Error
        )
        return
      }
      const keyring = new Keyring({ type: 'sr25519' })
      const alice = keyring.addFromUri('//Alice', { name: 'Alice default' })
      this.hasActiveClosing = true
      Builder(api)
        .from(this.parachains[source])
        .closeChannel()
        .inbound(0)
        .outbound(0)
        .build()
        .signAndSend(alice, (res) =>
          this.handleChannelClosing(res, source, destination)
        )
    },

    /**
     * Method to handle chain responses when closing channel
     * @param result Result from chain
     * @param source Source chain ID
     * @param destination Destination chain ID
     */
    handleChannelClosing(
      { status, txHash }: SubmittableResult,
      source: number,
      destination: number
    ): void {
      const notificationStore = useNotificationStore()
      if (!this.closingInformed) {
        this.closingInformed = true
        notificationStore.create(
          `Closing channel`,
          `You will get notified about channel status soon. Transaction hash is ${txHash.toHex()}`
        )
      }
      if (status.isFinalized) {
        this.removeExistingChannel(source, destination)
        this.hasActiveClosing = false
        this.closingInformed = false
        logger.success('Channel closed')
        notificationStore.create(
          'Channel closed',
          'Channel is closed, it might take a few seconds to remove from close channel panel.',
          NotificationType.Success
        )
      }
    },

    /**
     * Method to remove existing connection from list of active channels
     * @param source
     * @param destination
     */
    removeExistingChannel(source: number, destination: number): void {
      this.channels[source] = this.channels[source]?.filter(
        (id) => id !== destination
      )
      this.channels[destination] = this.channels[destination]?.filter(
        (id) => id !== source
      )
    },

    /**
     * Handler for loosing connection with API
     */
    handleApiError() {
      const notificationStore = useNotificationStore()
      this.apiConnected = false
      notificationStore.create(
        'Error',
        'Cant connect to API',
        NotificationType.Error
      )
    },
  },
  getters: {
    hasActiveOpening: (state) =>
      state.sourceInformed || state.destinationInformed,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
