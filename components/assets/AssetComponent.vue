<template>
  <n-space vertical>
    <n-space>
      Send to:
      <n-switch v-model:value="forMe">
        <template #unchecked>Address</template>
        <template #unchecked-icon>
          <n-icon :component="ArrowForwardOutlined" />
        </template>
        <template #checked>Myself</template>
        <template #checked-icon>
          <n-icon :component="ArrowBackOutlined" />
        </template>
      </n-switch>
    </n-space>
    <n-space>
      <n-select
        v-model:value="selectedNode"
        :options="nodeOptions"
        class="node-select"
        placeholder="Select node"
        filterable
        clearable
        @update:value="assetsStore.selectNode(selectedNode as TNode)"
        @clear="clearNode"
      />
    </n-space>
    <n-select
      v-model:value="selectedAsset"
      :options="assetOptions"
      class="asset-select"
      placeholder="Select asset"
      :disabled="!selectedNode"
      filterable
      clearable
      @clear="clearAsset"
    />
    <n-space>
      <n-select
        v-model:value="selectedDestination"
        :options="destinationOptions"
        class="destination-select"
        placeholder="Select destination"
        :disabled="!selectedAsset"
        filterable
        clearable
        @clear="balance = 0"
      />
      <n-input-number
        v-model:value="balance"
        placeholder="Balance"
        step="0.001"
        min="0"
        :precision="3"
        :disabled="!selectedDestination"
      />
      <n-button type="primary" :disabled="!canSend" @click="onSend">
        Send
      </n-button>
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
import { TNode } from '@paraspell/sdk';
import { ArrowBackOutlined, ArrowForwardOutlined } from '@vicons/material';
import {
NButton,
NIcon,
NInputNumber,
NSelect,
NSpace,
NSwitch,
type SelectOption
} from 'naive-ui';

const assetsStore = useAssetsStore()

// Node logic
const nodeOptions = computed(() => assetsStore.nodeOptions)
const selectedNode = ref<TNode | null>(null)

// Asset logic
const assetOptions = computed<SelectOption[]>(() =>
  assetsStore.assetOptions.map((asset) => ({
    label: asset.symbol,
    value: asset.assetId + '-' + asset.symbol, // Neive UI doesn't support objects as options
  }))
)
const selectedAsset = ref<string | null>(null)

// Destination logic
const destinationOptions = computed(() => {
  if (!selectedAsset.value || !selectedNode.value) {
    return []
  }
  return assetsStore.destinationOptions(
    selectedAsset.value.split('-')[1],
    selectedNode.value
  )
})
const selectedDestination = ref<TNode | null>(null)

const clearNode = () => {
  selectedAsset.value = null
  selectedDestination.value = null
  balance.value = 0
  assetsStore.selectNode(null)
}

const clearAsset = () => {
  selectedDestination.value = null
  balance.value = 0
}

// For me logic
const forMe = ref(false)

// Balance logic
const balance = ref(0)

// Send logic
const canSend = computed(
  () => selectedNode.value && selectedAsset.value && balance.value > 0
)
const onSend = () => {
  const [assetId, symbol] = selectedAsset.value!.split('-')
  assetsStore.send(
    balance.value,
    {
      assetId,
      symbol,
    },
    forMe.value,
    selectedNode.value!,
    selectedDestination.value!
  )
}
</script>
<style lang="scss">
.node-select,
.asset-select,
.destination-select {
  width: 200px;
}
</style>
