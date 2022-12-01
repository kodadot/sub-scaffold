<template>
  <n-space>
    <n-card title="Pallet form">
      <ChainInfo />
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
import ChainInfo from '@/components/pallet/ChainInfo.vue'
import { useSubstrateStore } from '@/store/substrate'
import { NCard, NSpace } from 'naive-ui'

const substrateStore = useSubstrateStore()

onMounted(() => {
  substrateStore.connect()
})
</script>
