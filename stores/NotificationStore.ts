import consola from 'consola'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logger = consola.create({
  defaults: {
    tag: 'store::notification:',
  },
})

export enum NotificationType {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
}

export interface Notification {
  id: number
  title: string
  message: string
  type: NotificationType
  duration?: number
  showed?: boolean
}

type State = {
  notifications: Notification[]
  idCounter: number
}

export const useNotificationStore = defineStore({
  id: 'notification',
  state: (): State => ({
    notifications: [],
    idCounter: 0,
  }),
  actions: {
    /**
     * Create notification in app
     * @param title - Title of notification
     * @param message - Message inside notification
     * @param type - Type of notification based on `NotificationType` enum
     * @param duration - How long should this notification last in ms
     */
    create(
      title: string,
      message = '',
      type: NotificationType = NotificationType.Info,
      duration = 5000
    ) {
      const id = this.idCounter++
      this.notifications = [
        ...this.notifications,
        {
          id,
          title,
          message,
          type,
          duration,
        },
      ]
    },
    /**
     * Remove notification based on ID
     * @param id - ID of notification
     */
    remove(id: number) {
      this.notifications = this.notifications.filter((n) => n.id === id)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot))
}
