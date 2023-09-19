<template>
  <n-form>
    <n-form-item label="NFT contract address">
      <n-input
        v-model:value="formValue.contractAddress"
        type="text"
        placeholder="0x..."
        @change="getCurrentBalance"
      />
    </n-form-item>
    <n-form-item label="To address">
      <n-input
        v-model:value="formValue.toAddress"
        type="text"
        placeholder="0x..."
      />
    </n-form-item>
    <n-form-item label="NFT token id">
      <n-input
        v-model:value="formValue.tokenId"
        type="text"
        :allow-input="onlyAllowNumber"
        placeholder="token id"
        @change="getCurrentBalance"
      />
    </n-form-item>
    <n-form-item label="NFT amount">
      <n-input
        v-model:value="formValue.amount"
        type="text"
        :allow-input="onlyAllowNumber"
        placeholder="amount"
      />
    </n-form-item>
    <n-button
      class="button"
      strong
      secondary
      type="success"
      @click="transferToken"
    >
      Send
    </n-button>

    <n-alert title="My token balance" type="info">
      <p>To see your actual NFT balance please fill out following inputs:</p>
      <ul>
        <li>NFT contract address</li>
        <li>NFT token id</li>
      </ul>
    </n-alert>
    <n-card> NFT balance: {{ currentTokenBalance }}</n-card>
  </n-form>
</template>
<script lang="ts" setup>
import { NFormItem, NForm, NInput, NAlert, NCard, NButton } from 'naive-ui'
import Web3 from 'web3'
import Erc1155Abi from '~~/abis/erc1155-abi.json'
const ethAccountStore = useEthereumAccountStore()

const currentTokenBalance = ref(0)
const formValue = ref({
  contractAddress: '',
  toAddress: '',
  tokenId: undefined,
  amount: undefined,
})

const getCurrentBalance = async () => {
  if (
    !Web3.utils.isAddress(formValue.value.contractAddress) ||
    formValue.value.tokenId === undefined
  )
    return

  currentTokenBalance.value = await ethAccountStore.readContractFunction(
    formValue.value.contractAddress,
    Erc1155Abi,
    'balanceOf',
    [ethAccountStore.accountAddress, formValue.value.tokenId]
  )
}

const transferToken = async () => {
  await ethAccountStore.callContractFunction(
    formValue.value.contractAddress,
    Erc1155Abi,
    'safeTransferFrom',
    [
      ethAccountStore.accountAddress,
      formValue.value.toAddress,
      formValue.value.tokenId,
      formValue.value.amount,
      '0x',
    ]
  )
}
</script>
<style lang="scss" scoped>
.button {
  width: 100%;
}
</style>
