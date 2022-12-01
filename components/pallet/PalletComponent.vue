<template>
  <n-space>
    <n-card title="Pallet form">
      Connection state: {{ substrateStore.apiState }}
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
</script>
