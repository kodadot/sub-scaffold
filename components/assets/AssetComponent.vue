<template>
  <NSpace vertical class="asset-wrapper">
    <NSpace>
      Send to:
      <NSwitch v-model:value="forMe">
        <template #unchecked>Address</template>
        <template #unchecked-icon>
          <n-icon :component="ArrowForwardOutlined" />
        </template>
        <template #checked>Myself</template>
        <template #checked-icon>
          <n-icon :component="ArrowBackOutlined" />
        </template>
      </NSwitch>
    </NSpace>

    <NSpace>
      <NSelect
        v-model:value="selectedCurrency"
        :options="options"
        class="currency-select"
        placeholder="Select currency"
      />
      <NInputNumber
        v-model:value="balance"
        placeholder="Balance"
        step="0.001"
        min="0"
        :precision="3"
        :disabled="!selectedCurrency"
      />
      <NButton type="primary" :disabled="!canSend" @click="onSend">
        Send
      </NButton>
    </NSpace>
  </NSpace>
</template>
<script lang="ts" setup>
import { useAssetsStore } from '@/store/assets'
import {
  NButton,
  NInputNumber,
  NSelect,
  NSpace,
  NSwitch,
  NIcon,
  type SelectOption,
} from 'naive-ui'
import { ArrowBackOutlined, ArrowForwardOutlined } from '@vicons/material'

const assetsStore = useAssetsStore()

// Load currencies
const selectedCurrency = ref<string>()
onMounted(async () => {
  await assetsStore.fetchCurrencies()
  selectedCurrency.value = assetsStore.currencies[0]?.id
})

const options = computed(() =>
  assetsStore.currencies.map<SelectOption>((x) => ({
    label: x.name,
    value: x.id,
  }))
)
// For me logic
const forMe = ref(false)

// Balance logic
const balance = ref(0)

const canSend = computed(() => balance.value > 0 && selectedCurrency.value)
const onSend = () => {
  if (selectedCurrency.value) {
    assetsStore.send(balance.value, selectedCurrency.value, forMe.value)
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
