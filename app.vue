<template>
  <n-config-provider :theme="theme">
    <client-only>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </client-only>
  </n-config-provider>
</template>
<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui'

const theme = ref(darkTheme)
</script>
