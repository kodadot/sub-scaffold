<template>
  <n-layout>
    <navbar-component />
    <n-layout-content content-style="padding: 24px;">
      <n-grid x-gap="12" :cols="4">
        <n-gi offset="1" span="2">
          <slot />
        </n-gi>
        <n-gi>
          <div></div>
        </n-gi>
      </n-grid>
    </n-layout-content>
    <n-layout-footer>
      <footer-component />
    </n-layout-footer>
  </n-layout>
</template>
<script setup lang="ts">
import { NGi, NGrid, NLayout, NLayoutContent, NLayoutFooter } from 'naive-ui'
</script>
