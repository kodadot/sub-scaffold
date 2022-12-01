<template>
  <n-config-provider :theme="theme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-config-provider>
</template>
<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui'

const theme = ref(darkTheme)
</script>
