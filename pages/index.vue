<template>
  <div>
    <h1>Welcome to home page!</h1>
    <n-space vertical>
      <span class="filler" />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NSpace } from 'naive-ui'
</script>

<style scoped lang="scss">
.filler {
  min-height: 80vh;
  display: block;
}
</style>
