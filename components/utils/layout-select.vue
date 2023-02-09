<template>
  <n-dropdown trigger="click" :options="options" @select="setPageLayout">
    <n-button>Change page layout</n-button>
  </n-dropdown>
</template>
<script setup lang="ts">
import { NButton, NDropdown } from 'naive-ui'

const options = [
  { label: 'Centered full width', key: 'full-layout' },
  { label: 'Default', key: 'default-layout' },
  { label: 'Centered half', key: 'centered-layout' },
]
</script>
