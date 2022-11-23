<template>
  <n-layout>
    <navbar-component />
    <n-layout-content content-style="padding: 24px;">
      <n-space vertical size="large">
        <slot />
      </n-space>
    </n-layout-content>
    <n-layout-footer>
      <footer-component />
    </n-layout-footer>
  </n-layout>
</template>
<script setup lang="ts">
import {
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NSpace,
} from 'naive-ui'
</script>
