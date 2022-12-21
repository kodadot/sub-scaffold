<template>
  <NSpace vertical>
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
        v-model:value="selectedNode"
        :options="nodeOptions"
        class="node-select"
        placeholder="Select node"
        @update:value="assetsStore.selectNode(selectedNode as TNode)"
      />
    </NSpace>
    <NSpace>
      <NSelect
        v-model:value="selectedAsset"
        :options="assetOptions"
        class="asset-select"
        placeholder="Select asset"
        :disabled="!selectedNode"
      />
      <NInputNumber
        v-model:value="balance"
        placeholder="Balance"
        step="0.001"
        min="0"
        :precision="3"
        :disabled="!selectedAsset"
      />
      <NButton type="primary" :disabled="!canSend" @click="onSend">
        Send
      </NButton>
    </NSpace>
  </NSpace>
</template>
<script lang="ts" setup>
import { ArrowBackOutlined, ArrowForwardOutlined } from '@vicons/material'
import {
  NButton,
  NIcon,
  NInputNumber,
  NSelect,
  NSpace,
  NSwitch,
  type SelectOption,
} from 'naive-ui'

import type { TNode } from '@/stores/assetsStore'

const assetsStore = useAssetsStore()
//TODO: Implement node options from paraspell
const nodeOptions = computed(() => assetsStore.nodeOptions)
const selectedNode = ref<string | null>(null)

const assetOptions = computed<SelectOption[]>(() =>
  //TODO: Not sure how to represent value as string, for now concat assetId and symbol with '-'
  assetsStore.assetOptions.map((asset) => ({
    label: asset.symbol,
    value: asset.assetId + '-' + asset.symbol,
  }))
)
const selectedAsset = ref<string | null>(null)

// For me logic
const forMe = ref(false)

// Balance logic
const balance = ref(0)

const canSend = computed(
  () => selectedNode.value && selectedAsset.value && balance.value > 0
)
const onSend = () => {
  const splitted = selectedAsset.value!.split('-')
  assetsStore.send(
    balance.value,
    {
      assetId: splitted[0],
      symbol: splitted[1],
    },
    forMe.value
  )
}
</script>
<style lang="scss">
.node-select {
  width: 200px;
}
.asset-select {
  width: 200px;
}
</style>
