<template>
  <n-config-provider :theme="theme">
    <n-notification-provider>
      <nuxt-page />
    </n-notification-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import {
  darkTheme,
  GlobalTheme,
  NConfigProvider,
  NNotificationProvider,
} from 'naive-ui'
const mainStore = useMainStore()
const theme = computed<GlobalTheme | null>(() =>
  mainStore.darkTheme ? darkTheme : null
)
</script>
<style lang="scss">
.filler {
  min-height: 60vh;
  display: block;
}
</style>
