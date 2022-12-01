<template>
  <n-space>
    <n-card title="Pallet form">
      Connection state: {{ connectionState }}
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
import { useSubstrateStore } from '@/store/substrate'
import { NCard, NSpace } from 'naive-ui'

const substrateStore = useSubstrateStore()
onMounted(() => {
  substrateStore.connect()
})

const connectionState = computed(() => substrateStore.apiState)
</script>
