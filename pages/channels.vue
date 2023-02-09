<template>
  <nuxt-layout name="full-layout">
    <n-grid cols="1 m:2" x-gap="24" y-gap="24" responsive="screen">
      <n-gi>
        <n-card size="large">
          <template #header>
            <h1 style="text-align: center">Open channel</h1>
            <n-divider />
          </template>
          <open-connection />
        </n-card>
      </n-gi>
      <n-gi>
        <n-card size="large">
          <template #header>
            <h1 style="text-align: center">Active channels</h1>
            <n-divider />
          </template>
          <close-connection />
        </n-card>
      </n-gi>
    </n-grid>
    <div class="filler" />
  </nuxt-layout>
</template>
<script setup lang="ts">
import { NGrid, NGi, NCard, NDivider } from 'naive-ui'
import OpenConnection from '~/components/channels/open-connection.vue'
import CloseConnection from '~/components/channels/close-connection.vue'
definePageMeta({
  layout: false,
})
const channelStore = useChannelStore()
onMounted(async () => {
  await channelStore.loadParachains()
  await channelStore.loadChannels()
})
</script>
