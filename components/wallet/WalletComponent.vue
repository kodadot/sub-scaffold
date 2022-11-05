<template>
  <n-button class="connect-button" @click="showModal"
    >Connect your wallet</n-button
  >
  <n-modal v-model:show="modalState">
    <n-card
      style="padding: 5px; width: 300px"
      title="Which wallet you want to connect?"
      :bordered="false"
      role="dialog"
      aria-modal="true"
      @close="cancelModal"
    >
      <n-space vertical :size="[10, 20]">
        <n-button class="wallet-button" type="primary">Metamask</n-button>
        <n-button class="wallet-button" type="primary">Polkadot.js</n-button>
        <n-button class="wallet-button" @click="cancelModal">Cancel</n-button>
      </n-space>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { NButton, NModal, NSpace, NCard } from 'naive-ui'

const modalState = ref(false)

const showModal = () => {
  modalState.value = true
}

const cancelModal = () => {
  modalState.value = false
}
</script>
<style lang="scss">
.connect-button {
  margin: 10px;
}

.wallet-button {
  width: 100%;
}
</style>
