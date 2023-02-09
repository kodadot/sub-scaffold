<template>
  <n-layout>
    <navbar-component />
    <n-layout-content content-style="padding: 24px;">
      <n-grid x-gap="12" cols="1 l:3" responsive="screen">
        <n-gi offset="0 l:1">
          <slot />
        </n-gi>
        <n-gi>
          <div />
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
  NLayout,
  NGrid,
  NGi,
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
