<template>
  <n-form-item label="Select source chain">
    <n-select
      v-model:value="selectedNode"
      :options="nodeOptions"
      class="node-select"
      placeholder="Select node"
      filterable
      clearable
      @update:value="assetsStore.selectNode(selectedNode as TNode)"
      @clear="$emit('clear')"
    />
  </n-form-item>
</template>
<script lang="ts" setup>
import { TNode } from '@paraspell/sdk'
import {
  NFormItem,
  NSelect,
  type SelectGroupOption,
  type SelectOption,
} from 'naive-ui'

const props = defineProps<{
  node: TNode | null
}>()
const $emit = defineEmits(['change', 'clear'])

// Node logic
const assetsStore = useAssetsStore()

const nodeOptions = computed<Array<SelectOption | SelectGroupOption>>(() => {
  const [availible, unavailible] = splitNodesByAvailibility(
    assetsStore.nodeOptions,
    SUPPORTED_NODES
  )
  return [
    {
      type: 'group',
      label: 'Availible nodes',
      key: 'availible',
      children: availible,
    },
    {
      type: 'group',
      label: 'Unavailable nodes',
      key: 'unavailable',
      children: unavailible,
    },
  ]
})
const selectedNode = ref<TNode | null>(null)

watch(
  () => props.node,
  (val) => (selectedNode.value = val)
)

watch(
  () => selectedNode.value,
  (val) => $emit('change', val)
)
</script>
<style lang="scss" scoped>
.node-select {
  width: 100%;
}
</style>
