<template>
  <NSpace class="asset-wrapper">
    <NSelect
      v-model:value="selectedCurrency"
      :options="options"
      class="currency-select"
    />
    <NInputNumber
      v-model:value="balance"
      step="0.001"
      min="0"
      :precision="3"
      :disabled="!selectedCurrency"
    />
    <NButton type="primary" @click="onSend">Send</NButton>
  </NSpace>
</template>
<script lang="ts" setup>
import { useAssetsStore } from '@/store/assets/assetsStore'
import {
  NButton,
  NInputNumber,
  NSelect,
  NSpace,
  type SelectOption,
} from 'naive-ui'

const assetsStore = useAssetsStore()

const balance = ref(0)

const options = computed(() =>
  assetsStore.currencies.map<SelectOption>((x) => ({
    label: x.name,
    value: x.id,
  }))
)

const selectedCurrency = ref<string>()

onMounted(async () => {
  await assetsStore.fetchCurrencies()
  selectedCurrency.value = assetsStore.currencies[0]?.id
})

const onSend = () => {
  if (selectedCurrency.value) {
    assetsStore.send(balance.value, selectedCurrency.value)
  }
}
</script>
<style lang="scss">
.asset-wrapper {
  margin: 10px;
  margin-top: 20px;
}
.currency-select {
  width: 100px;
}
</style>
