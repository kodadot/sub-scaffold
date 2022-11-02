<template>
  <div>
    <h1>Welcome to home page, count:{{ store.count }}</h1>
    <TestComponent
      v-for="val in [1, undefined, 2]"
      :key="`k-${val}`"
      :foo="val"
    />
  </div>
</template>

<script setup lang="ts">
import TestComponent from "~~/components/TestComponent.vue";
import { useDefaultStore } from "@/store/default/defaultStore";

const store = useDefaultStore();
</script>

<style scoped lang="scss"></style>
