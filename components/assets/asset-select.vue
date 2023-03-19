<template>
  <n-select
    v-model:value="selectedAsset"
    :options="assetsOptions"
    class="asset-select"
    placeholder="Select asset"
    :disabled="isDisabled"
    filterable
    clearable
    @clear="$emit('clear')"
  />
</template>
<script lang="ts" setup>
import { TNode } from '@paraspell/sdk'
import { NSelect, type SelectOption } from 'naive-ui'
import { TransferType } from '~~/stores/AssetStore'
const $emit = defineEmits(['clear', 'change'])

const props = defineProps<{
  selectedNode: TNode | null
  asset: number | null
  transferType: TransferType | null
}>()

/// Assets logic
const assetsStore = useAssetsStore()

const availableAssets = computed(() =>
  assetsStore.assetOptions.map((asset, id) => ({ id, ...asset }))
)

const isDisabled = computed(() => {
  if (props.transferType !== 'RtP') return !props.selectedNode
  return false
})

const assetsOptions = computed<SelectOption[]>(() => {
  const all = availableAssets.value.map(({ symbol, id }) => ({
    label: symbol,
    value: id,
  }))
  const [available, unavailable] = splitAssetsByAvailability(
    all,
    SUPPORTED_ASSETS
  )

  return [
    {
      type: 'group',
      label: 'Available assets',
      key: 'available',
      children: available,
    },
    {
      type: 'group',
      label: 'Unavailable assets',
      key: 'unavailable',
      children: unavailable,
    },
  ]
})
const selectedAsset = ref<number | null>(null)
watch(
  () => props.asset,
  (val) => (selectedAsset.value = val)
)

watch(
  () => selectedAsset.value,
  (val) => {
    $emit('change', val)
  }
)
</script>
<style lang="scss" scoped>
.asset-select {
  width: 30%;
}
</style>
