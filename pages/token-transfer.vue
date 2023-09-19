<template>
  <nuxt-layout name="default-layout">
    <n-space vertical>
      <n-card>
        <template #header>
          <n-space align="center" justify="center">
            <h1 style="padding-bottom: 10px">Token Transfer</h1>
          </n-space>
          <TokenTransferComponent />
          <n-divider />
        </template>
      </n-card>
    </n-space>
    <n-space vertical>
      <span class="filler" />
    </n-space>
  </nuxt-layout>
</template>

<script setup lang="ts">
import { NSpace, NCard, NDivider } from 'naive-ui'
import TokenTransferComponent from '~~/components/tokens/token-transfer-component.vue'
definePageMeta({
  layout: false,
})
</script>
<style lang="scss" scoped>
.paraspell {
  width: 180px;
}
</style>
