<template>
  <div>
    {{ foo ?? "Not defined" }}
    <hr />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  foo?: number;
}>();
</script>

<style scoped></style>
