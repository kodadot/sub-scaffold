<template>
  <n-space vertical justify="center">
    <n-alert v-if="!hasAccount" title="Select account" type="error">
      You haven't selected any account. Please select your account to continue
      with teleport process.
    </n-alert>
    <n-form>
      <n-form-item label="Select XYK action">
        <n-select
          v-model:value="selectedAction"
          :options="actions"
          :disabled="transactionRunning"
          @update:value="clear"
        />
      </n-form-item>
      <n-form-item v-if="hasAssetA" :label="assetALabel">
        <n-input
          v-model:value="assetA"
          :allow-input="onlyAllowNumber"
          :disabled="transactionRunning"
          placeholder="Asset ID"
        />
      </n-form-item>
      <n-form-item v-if="hasAssetB" :label="assetBLabel">
        <n-input
          v-model:value="assetB"
          :allow-input="onlyAllowNumber"
          :disabled="transactionRunning"
          placeholder="Asset ID"
        />
      </n-form-item>
      <n-form-item v-if="hasAmountA" :label="amountALabel">
        <n-input-number
          v-model:value="amountA"
          :disabled="transactionRunning"
          style="width: 100%"
          placeholder="Amount"
          clearable
          min="0"
        />
      </n-form-item>
      <n-form-item v-if="hasAmountB" :label="amountBLabel">
        <n-input-number
          v-model:value="amountB"
          :disabled="transactionRunning"
          style="width: 100%"
          placeholder="Amount"
          clearable
          min="0"
        />
      </n-form-item>
      <n-form-item v-if="hasLimit" :label="limitLabel">
        <n-input-number
          v-model:value="limit"
          :disabled="transactionRunning"
          style="width: 100%"
          placeholder="Amount"
          clearable
          min="0"
        />
      </n-form-item>
      <n-checkbox
        v-if="hasDiscount"
        :checked="discount"
        :disabled="transactionRunning"
        style="margin-left: 10px"
        @update:checked="(v) => (discount = v)"
      >
        Do you want to apply discount if possible?
      </n-checkbox>
      <n-form-item v-if="selectedAction !== null">
        <n-button
          type="primary"
          style="width: 100%"
          icon-placement="right"
          :loading="transactionRunning"
          :disabled="!canSend"
          @click="send"
        >
          Send transaction
          <template #icon>
            <n-icon>
              <send-icon />
            </n-icon>
          </template>
        </n-button>
      </n-form-item>
    </n-form>
  </n-space>
</template>
<script setup lang="ts">
import {
  NSpace,
  NInput,
  NAlert,
  NForm,
  NFormItem,
  NButton,
  NInputNumber,
  NSelect,
  NCheckbox,
  NIcon,
} from 'naive-ui'

import { SendFilled as SendIcon } from '@vicons/material'
// Xyk
const xykStore = useXykStore()
const transactionRunning = computed(() => xykStore.running)

/// Account logic
const accountStore = useAccountStore()
const account = computed(() => accountStore.selected)

const hasAccount = computed(() => !!account.value)

enum XykActions {
  CREATE_POOL,
  ADD_LIQUIDITY,
  REMOVE_LIQUIDITY,
  BUY,
  SELL,
}

// Actions
const actions = [
  { value: XykActions.CREATE_POOL, label: 'Create pool' },
  { value: XykActions.ADD_LIQUIDITY, label: 'Add liquidity' },
  { value: XykActions.REMOVE_LIQUIDITY, label: 'Remove liquidity' },
  { value: XykActions.BUY, label: 'Buy' },
  { value: XykActions.SELL, label: 'Sell' },
]

const selectedAction = ref<XykActions | null>(null)

// Assets logic

const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value)

// Asset A
const hasAssetA = computed(() => selectedAction.value !== null)
const assetALabel = computed(() =>
  selectedAction.value === XykActions.BUY ||
  selectedAction.value === XykActions.SELL
    ? 'Asset you buy'
    : 'Asset A'
)
const assetA = ref<string>('')

// Asset B
const hasAssetB = computed(() => selectedAction.value !== null)
const assetBLabel = computed(() =>
  selectedAction.value === XykActions.BUY ||
  selectedAction.value === XykActions.SELL
    ? 'Asset you sell'
    : 'Asset B'
)
const assetB = ref<string>('')

// Amount A
const hasAmountA = computed(
  () =>
    selectedAction.value !== null &&
    selectedAction.value !== XykActions.REMOVE_LIQUIDITY
)
const amountALabel = computed(() =>
  selectedAction.value === XykActions.BUY ||
  selectedAction.value === XykActions.SELL
    ? 'Amout you want to buy'
    : 'Amount of asset A'
)
const amountA = ref<number>(0)

// Amount B
const hasAmountB = computed(
  () => selectedAction.value === XykActions.CREATE_POOL
)
const amountBLabel = computed(() =>
  selectedAction.value === XykActions.SELL
    ? 'Amout you want to sell'
    : 'Amount of asset B'
)
const amountB = ref<number>(0)

// Limit
const hasLimit = computed(
  () =>
    selectedAction.value !== null &&
    selectedAction.value !== XykActions.CREATE_POOL
)
const limitLabel = computed<string>(() =>
  selectedAction.value === 2
    ? 'Max limit of asset B'
    : selectedAction.value === 3
    ? 'How much liquidity you wish to remove'
    : selectedAction.value === 4
    ? 'Max limit you want to give'
    : 'Max limit you want to provide'
)
const limit = ref<number>(0)

// Discount
const hasDiscount = computed(
  () =>
    selectedAction.value === XykActions.BUY ||
    selectedAction.value === XykActions.SELL
)
const discount = ref<boolean>(false)

// Clearing of inputs
const clear = () => {
  assetA.value = ''
  assetB.value = ''
  amountA.value = 0
  amountB.value = 0
  limit.value = 0
  discount.value = false
}

// Sending
const canSend = computed<boolean>(() => {
  if (transactionRunning.value || !hasAccount.value) {
    return false
  }
  switch (selectedAction.value) {
    case XykActions.CREATE_POOL:
      return (
        !!assetA.value &&
        amountA.value >= 0 &&
        !!assetB.value &&
        amountB.value >= 0
      )
    case XykActions.ADD_LIQUIDITY:
      return (
        !!assetA.value &&
        amountA.value >= 0 &&
        !!assetB.value &&
        limit.value >= 0
      )
    case XykActions.REMOVE_LIQUIDITY:
      return !!assetA.value && !!assetB.value && limit.value >= 0
    case XykActions.BUY:
      return (
        !!assetA.value &&
        amountA.value >= 0 &&
        !!assetB.value &&
        limit.value >= 0
      )
    case XykActions.SELL:
      return (
        !!assetA.value &&
        amountA.value >= 0 &&
        !!assetB.value &&
        limit.value >= 0
      )
  }
  return false
})

const send = () => {
  // Calling store logic by selected operation
  switch (selectedAction.value) {
    case XykActions.CREATE_POOL:
      xykStore.createPool(
        Number(assetA.value),
        amountA.value,
        Number(assetB.value),
        amountB.value,
        account.value!
      )
      break
    case XykActions.ADD_LIQUIDITY:
      xykStore.addLiquidity(
        Number(assetA.value),
        amountA.value,
        Number(assetB.value),
        limit.value,
        account.value!
      )
      break
    case XykActions.REMOVE_LIQUIDITY:
      xykStore.removeLiquidity(
        Number(assetA.value),
        Number(assetB.value),
        limit.value,
        account.value!
      )
      break
    case XykActions.BUY:
      xykStore.buy(
        Number(assetA.value),
        amountA.value,
        Number(assetB.value),
        limit.value,
        discount.value,
        account.value!
      )
      break
    case XykActions.SELL:
      xykStore.sell(
        Number(assetA.value),
        amountA.value,
        Number(assetB.value),
        limit.value,
        discount.value,
        account.value!
      )
      break
  }
}
</script>
<style lang="scss"></style>
