<template>
  <div>
    <button @click="store.increment">
      {{ foo ?? "Not defined" }}
    </button>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { useDefaultStore } from "@/store/default/defaultStore";
defineProps<{
  foo?: number;
}>();

const store = useDefaultStore();
</script>

<style scoped></style>
