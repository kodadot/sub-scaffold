<template>
  <n-space v-if="chainsLoaded" vertical align="center" :wrap-item="false">
    <n-alert
      v-if="!hasChannels"
      style="width: 100%"
      title="No channels"
      type="warning"
    >
      There are currently no opened channels.
    </n-alert>
    <n-button
      v-for="[src, dest] in channels"
      :key="`${src}-${dest}`"
      class="active-channel"
      :loading="loading"
      :disabled="loading"
      icon-placement="right"
      ghost
      @click="channelStore.closeChannelConnections(src, dest)"
    >
      <template #icon>
        <n-icon>
          <close-icon />
        </n-icon>
      </template>
      {{ getChainName(src) }} &amp; {{ getChainName(dest) }}
    </n-button>
  </n-space>
  <n-space v-else vertical align="center" :wrap-item="false">
    <n-skeleton v-for="_ in [1, 2, 3]" :key="_" size="medium" :sharp="false" />
  </n-space>
</template>
<script lang="ts" setup>
import { NButton, NIcon, NSpace, NAlert, NSkeleton } from 'naive-ui'
import { CloseFilled as CloseIcon } from '@vicons/material'
const channelStore = useChannelStore()

const chainsLoaded = computed(() => channelStore.apiConnected)

const channels = computed<[number, number][]>(() => {
  const all = [] as [number, number][]
  for (const [id, subchannels] of Object.entries(channelStore.channels)) {
    subchannels.forEach((ch) => all.push([Number(id), ch]))
  }
  return all
})

const hasChannels = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, subchannels] of Object.entries(channels.value) as unknown as [
    number,
    number[]
  ][]) {
    if (subchannels?.length) return true
  }
})

const loading = computed(
  () => channelStore.hasActiveClosing || channelStore.hasActiveOpening
)

const getChainName = (chainId: number) => channelStore.parachains[chainId]
</script>
<style lang="scss" scoped>
.active-channel {
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}

.button-text {
  text-align: center;
}
</style>
