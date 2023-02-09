<template>
  <n-layout>
    <navbar-component />
    <n-layout-content content-style="padding: 24px;">
      <n-grid x-gap="12" cols=" 1 m:4" responsive="screen">
        <n-gi offset="0 m:1" span="1 m:2">
          <slot />
        </n-gi>
      </n-grid>
    </n-layout-content>
    <n-layout-footer>
      <footer-component />
    </n-layout-footer>
  </n-layout>
</template>
<script setup lang="ts">
import {
  NGi,
  NGrid,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  useNotification,
} from 'naive-ui'
import type { Notification } from '~~/stores/NotificationStore'
const $notifications = useNotification()
const notificationStore = useNotificationStore()

const createNotification = (notification: Notification) => {
  $notifications.create({
    title: notification.title,
    description: notification.message,
    type: notification.type,
    duration: notification.duration,
  })
  setTimeout(
    () => notificationStore.remove(notification.id),
    notification.duration
  )

  notification.showed = true
}

watch(
  () => notificationStore.notifications,
  (values) => {
    values.forEach((notification) => {
      !notification.showed && createNotification(notification)
    })
  }
)
</script>
