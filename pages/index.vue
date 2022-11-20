<template>
  <div>
    <h1>Welcome to home page, count:{{ store.count }}</h1>
    <n-space vertical>
      <TestComponent
        v-for="val in [undefined, 2, 3]"
        :key="`k-${val}`"
        :by="val"
      />
      <n-button @click.stop="store.apiCall()">Test API</n-button>
      <AssetComponent />
      <AddressComponent strict />
      <span class="filler" />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import AddressComponent from '@/components/assets/AddressComponent.vue'
import AssetComponent from '@/components/assets/AssetComponent.vue'
import TestComponent from '@/components/TestComponent.vue'
import { useDefaultStore } from '@/store/default'
import { NButton, NSpace } from 'naive-ui'

const store = useDefaultStore()
</script>

<style scoped lang="scss">
.filler {
  min-height: 60vh;
  display: block;
}
</style>
