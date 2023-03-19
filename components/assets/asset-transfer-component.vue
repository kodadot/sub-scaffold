<template>
  <n-space vertical>
    <n-alert title="Current support" type="info">
      Currently supported chains on Paraspell: &nbsp;
      <code>{{ SUPPORTED_NODES.join(', ') }}</code>
    </n-alert>
    <n-alert v-if="!hasAccount" title="Select account" type="error">
      You haven't selected any account. Please select your account to continue
      with teleport process.
    </n-alert>
    <n-alert v-else title="Your account" type="info">
      Your current account: &nbsp;
      <code>{{ account?.meta.source }} ({{ account?.meta.name }})</code>
    </n-alert>
    <n-form>
      <transfer-type-select @change="setTransferType" @clear="clearType" />

      <source-node
        v-if="selectedType && selectedType !== 'RtP'"
        :node="selectedNode"
        @clear="clearNode"
        @change="setSourceNode"
      />

      <n-form-item v-if="selectedType" label="Select asset">
        <n-input-group>
          <n-input-number
            v-model:value="balance"
            style="width: 80%"
            placeholder="Balance"
            step="0.001"
            min="0.1"
            :disabled="isBalanceDisabled"
            :precision="3"
          />
          <asset-select
            v-if="selectedType"
            :asset="selectedAsset"
            :transfer-type="selectedType"
            :selected-node="selectedNode"
            @clear="clearAsset"
            @change="setAsset"
          />
        </n-input-group>
      </n-form-item>

      <destination-node
        v-if="selectedType && selectedType !== 'PtR'"
        :destination="selectedDestination"
        :selected-node="selectedNode"
        :selected-asset="selectedAsset"
        @clear="clearDestination"
        @change="(dest) => (selectedDestination = dest)"
      />
      <address-component
        v-if="selectedType"
        v-model="destinationAddress"
        label="Destination address"
      />

      <n-form-item v-if="selectedType">
        <n-button
          type="primary"
          style="width: 100%"
          :disabled="!canSend"
          @click="onSend"
        >
          Send
        </n-button>
      </n-form-item>
    </n-form>
  </n-space>
</template>
<script lang="ts" setup>
import { TNode } from '@paraspell/sdk'
import {
  NAlert,
  NButton,
  NForm,
  NFormItem,
  NInputGroup,
  NInputNumber,
  NSpace,
} from 'naive-ui'
import AddressComponent from './address-component.vue'
import SourceNode from './source-node.vue'
import AssetSelect from './asset-select.vue'
import DestinationNode from './destination-node.vue'
import TransferTypeSelect from './transfer-type-select.vue'
import type { TransferType } from '~~/stores/AssetStore'
import { SupportedNode } from '~~/utils/nodes'
/// Notification logic
const notificationStore = useNotificationStore()
/// Account logic
const accountStore = useAccountStore()
const account = computed(() => accountStore.selected)

const hasAccount = computed(() => !!account.value)

/// Assets logic
const assetsStore = useAssetsStore()

const selectedType = ref<TransferType | null>(null)

const setTransferType = (type: TransferType) => {
  selectedType.value = type
  clearNode()
}

const destinationAddress = ref('')

const selectedNode = ref<TNode | null>(null)

const setSourceNode = (node: TNode) => {
  selectedNode.value = node
  clearAsset()
}

const selectedAsset = ref<number | null>(null)

const setAsset = (assetId: number) => {
  selectedAsset.value = assetId
  clearDestination()
}

const selectedDestination = ref<TNode | null>(null)

const balance = ref(0)
const isBalanceDisabled = computed(() => {
  if (selectedType.value !== 'RtP') return !selectedNode.value
  return false
})

watch(
  () => selectedType.value,
  () => {
    selectedNode.value = null
    assetsStore.selectNode(null)
  }
)

// Clearing
const clearType = () => {
  selectedNode.value = null
  clearNode()
}
const clearNode = () => {
  assetsStore.selectNode(null)
  selectedAsset.value = null
  clearAsset()
}
const clearAsset = () => {
  selectedDestination.value = null
  clearDestination()
}
const clearDestination = () => {
  balance.value = 0.1
}

// Send logic
const canSend = computed(
  () =>
    hasAccount.value &&
    selectedType.value !== null &&
    (selectedNode.value !== null || selectedType.value === 'RtP') &&
    (selectedDestination.value !== null || selectedType.value === 'PtR') &&
    selectedAsset.value !== null &&
    balance.value >= 0.1
)
const onSend = () => {
  const asset = assetsStore.assetOptions.find(
    (_, index) => index === selectedAsset.value
  )
  if (!asset) {
    notificationStore.create('Invalid asset selected')
    return
  }
  assetsStore.send(
    balance.value,
    asset,
    selectedType.value!,
    selectedNode.value! as SupportedNode,
    selectedDestination.value! as SupportedNode,
    destinationAddress.value
  )
}
</script>
