<template>
  <n-space vertical>
    <n-space>
      <n-button
        :type="transferType === TransferType.erc20 ? 'primary' : 'default'"
        @click="transferType = TransferType.erc20"
      >
        ERC-20
      </n-button>
      <n-button
        :type="transferType === TransferType.erc721 ? 'primary' : 'default'"
        @click="transferType = TransferType.erc721"
      >
        ERC-721
      </n-button>
      <n-button
        :type="transferType === TransferType.erc1155 ? 'primary' : 'default'"
        @click="transferType = TransferType.erc1155"
      >
        ERC-1155
      </n-button>
    </n-space>
    <n-space vertical>
      <n-divider />
      <Erc20TransferComponent v-if="transferType === TransferType.erc20" />
      <Erc721TransferComponent v-if="transferType === TransferType.erc721" />
      <Erc1155TransferComponent v-if="transferType === TransferType.erc1155" />
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
import { NButton, NSpace, NDivider } from 'naive-ui'
import Erc20TransferComponent from './erc-20-transfer-component.vue'
import Erc721TransferComponent from './erc-721-transfer-component.vue'
import Erc1155TransferComponent from './erc-1155-transfer-component.vue'

enum TransferType {
  erc20,
  erc721,
  erc1155,
}
const transferType = ref(TransferType.erc20)
/// Account logic
</script>
