<template>
  <nuxt-layout name="default-layout">
    <n-space vertical>
      <n-card>
        <template #header>
          <span id="heading-wrapper">
            <h1 id="heading">XYK by</h1>
            <img src="/images/bsx.svg" alt="bsx" />
          </span>
          <n-divider />
        </template>
        <xyk />
      </n-card>
    </n-space>
    <n-space vertical>
      <span class="filler" />
    </n-space>
  </nuxt-layout>
</template>
<script setup lang="ts">
import { NCard, NSpace, NDivider } from 'naive-ui'
import Xyk from '~/components/xyk/xyk-component.vue'
definePageMeta({
  layout: false,
})
</script>
<style lang="scss" scoped>
#heading {
  text-align: center;
}
#heading-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}
</style>
