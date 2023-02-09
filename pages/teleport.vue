<template>
  <nuxt-layout name="default-layout">
    <n-space vertical>
      <n-card>
        <template #header>
          <n-space align="center" justify="center">
            <h1 style="padding-bottom: 10px">Teleport by</h1>
            <img
              src="/images/paraspellLogo.png"
              alt="paraspell"
              class="paraspell"
            />
          </n-space>
          <n-divider />
        </template>
        <asset-transfer-component />
      </n-card>
    </n-space>
    <n-space vertical>
      <span class="filler" />
    </n-space>
  </nuxt-layout>
</template>

<script setup lang="ts">
import { NSpace, NCard, NDivider } from 'naive-ui'
import AssetTransferComponent from '~~/components/assets/asset-transfer-component.vue'
definePageMeta({
  layout: false,
})
</script>
<style lang="scss" scoped>
.paraspell {
  width: 180px;
}
</style>
