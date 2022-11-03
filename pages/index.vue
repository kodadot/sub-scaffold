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
      <span class="filler" />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import TestComponent from '@/components/TestComponent.vue'
import AssetComponent from '@/components/assets/AssetComponent.vue'
import { useDefaultStore } from '@/store/default/defaultStore'
import { NSpace, NButton } from 'naive-ui'

const store = useDefaultStore()
</script>

<style scoped lang="scss">
.filler {
  min-height: 60vh;
  display: block;
}
</style>
