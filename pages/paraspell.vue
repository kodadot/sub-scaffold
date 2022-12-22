<template>
  <div>
    <h1>Paraspell assets</h1>
    <n-space vertical>
      <asset-component />
      <address-component />
    </n-space>
    <n-space vertical>
      <span class="filler" />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import AddressComponent from '@/components/assets/AddressComponent.vue'
import AssetComponent from '@/components/assets/AssetComponent.vue'
import { NSpace } from 'naive-ui'
</script>

<style scoped lang="scss">
.filler {
  min-height: 35vh;
  display: block;
}
</style>
