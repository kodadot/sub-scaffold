<template>
  <n-config-provider :theme="darkT">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider, darkTheme, NSpace } from "naive-ui";

const darkT = ref(darkTheme);
</script>
