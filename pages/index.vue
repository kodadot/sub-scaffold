<template>
  <nuxt-layout name="full-layout">
    <n-space justify="center">
      <h1>Welcome to sub-scaffold</h1>
    </n-space>
    <div class="filler" />
  </nuxt-layout>
</template>

<script setup lang="ts">
import { NSpace } from 'naive-ui'
definePageMeta({
  layout: false,
})
</script>

<style scoped lang="scss"></style>
