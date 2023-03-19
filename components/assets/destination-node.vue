<template>
  <n-form-item label="Select destination chain">
    <n-select
      v-model:value="selectedDestination"
      class="destination-select"
      placeholder="Select destination"
      :options="destinationOptions"
      :disabled="selectedAsset === null"
      filterable
      clearable
      @clear="$emit('clear')"
    />
  </n-form-item>
</template>
<script lang="ts" setup>
import { TNode } from '@paraspell/sdk'
import { NFormItem, NSelect } from 'naive-ui'

const props = defineProps<{
  selectedAsset: number | null
  selectedNode: TNode | null
  destination: TNode | null
}>()

const $emit = defineEmits(['clear', 'change'])

/// Assets logic
const assetsStore = useAssetsStore()

// Asset logic
const availableAssets = computed(() =>
  assetsStore.assetOptions.map((asset, id) => ({ id, ...asset }))
)

// Destination logic
const destinationOptions = computed(() => {
  if (props.selectedAsset === null) {
    return []
  }
  const asset = availableAssets.value.find(
    (asset) => asset.id === props.selectedAsset
  )
  if (!asset) return []
  const nodeOptions = assetsStore.destinationOptions(
    asset.symbol,
    props.selectedNode
  )

  const [available, unavailable] = splitNodesByAvailability(
    nodeOptions,
    SUPPORTED_NODES.filter((node) => node !== props.selectedNode)
  )
  return [
    {
      type: 'group',
      label: 'Available nodes',
      key: 'available',
      children: available,
    },
    {
      type: 'group',
      label: 'Unavailable nodes',
      key: 'unavailable',
      children: unavailable,
    },
  ]
})
const selectedDestination = ref<TNode | null>(null)
watch(
  () => props.destination,
  (val) => (selectedDestination.value = val)
)
watch(
  () => selectedDestination.value,
  (val) => {
    $emit('change', val)
  }
)
</script>
<style lang="scss" scoped>
.destination-select {
  width: 100%;
}
</style>
