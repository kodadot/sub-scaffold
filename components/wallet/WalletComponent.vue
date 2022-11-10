<template>
  <n-button style="margin: 10px" @click="showModal">
    Connect your wallet
  </n-button>
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
        <n-button
          v-for="wallet in wallets"
          :key="wallet.meta.name"
          style="width: 100%"
          type="primary"
        >
          {{ wallet.meta.source }} [[ {{ wallet.meta.name }} ]]
        </n-button>
        <n-button style="width: 100%" @click="cancelModal">Cancel</n-button>
      </n-space>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { useWalletStore } from '@/store/wallet'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { NButton, NModal, NSpace, NCard } from 'naive-ui'

const walletStore = useWalletStore()

onMounted(async () => {
  await web3Enable('subscaffold dapp')
  walletStore.setWallets(await web3Accounts())
})

const wallets = computed(() => walletStore.wallets)

const modalState = ref(false)

const showModal = () => {
  modalState.value = true
}

const cancelModal = () => {
  modalState.value = false
}
</script>
