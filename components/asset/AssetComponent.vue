<template>
  <NInputNumber v-model:value="ksmBalance" />
  <p>{{ prettifyBalance(fullBalance) }}</p>
  <NButton @click="incrementInner">
    <template #icon>
      <ArrowUpwardFilled />
    </template>
  </NButton>
  <NButton @click="decrementInner">
    <template #icon>
      <ArrowDownwardFilled />
    </template>
  </NButton>
</template>
<script lang="ts" setup>
import { NInputNumber, NButton } from 'naive-ui'
import { ArrowUpwardFilled, ArrowDownwardFilled } from '@vicons/material'
const ksmBalance = ref(0)

const innerControl = ref(0)

const decrementInner = () => {
  innerControl.value--
}

const incrementInner = () => {
  innerControl.value++
}

const fullBalance = computed(() => {
  return ksmBalance.value * 1000_000_000_000 + innerControl.value
})

/**
 * Regex magic to make it readable
 */
const prettifyBalance = (balance: number) =>
  String(balance)
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})/g, '$1,')
    .split('')
    .reverse()
    .join('')
    .replace(/^,/, '')
</script>
