<template>
  <div>
    <h1>Welcome to home page</h1>
    <TestComponent v-for="val in [1, undefined, 2]" :key="`k-${val}`" :foo="val" />
  </div>
</template>

<script setup lang="ts">
import TestComponent from "~~/components/TestComponent.vue";
</script>

<style scoped lang="scss"></style>
