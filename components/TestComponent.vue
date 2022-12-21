<template>
  <div>
    <n-button @click="store.increment(by)" type="primary" class="entry">
      Increment by {{ by ?? 1 }}
      <template #icon>
        <add-box-filled />
      </template>
    </n-button>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { AddBoxFilled } from '@vicons/material'
import { NButton } from 'naive-ui'
defineProps<{
  by?: number
}>()

const store = useDefaultStore()
</script>

<style lang="scss">
.entry {
  margin: 10px;
  min-width: 200px;
  justify-content: left;
}
</style>
