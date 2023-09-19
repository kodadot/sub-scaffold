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
import Erc721Abi from '~~/abis/erc721-abi.json'
const ethAccountStore = useEthereumAccountStore()

const currentTokenBalance = ref(0)
const formValue = ref({
  contractAddress: '',
  toAddress: '',
  tokenId: undefined,
})

const getCurrentBalance = async () => {
  if (
    !Web3.utils.isAddress(formValue.value.contractAddress) ||
    formValue.value.tokenId === undefined
  )
    return

  const nftOwner = await ethAccountStore.readContractFunction(
    formValue.value.contractAddress,
    Erc721Abi,
    'ownerOf',
    [formValue.value.tokenId]
  )
  currentTokenBalance.value =
    nftOwner.toLowerCase() === ethAccountStore.accountAddress.toLowerCase()
      ? 1
      : 0
}

const transferToken = async () => {
  await ethAccountStore.callContractFunction(
    formValue.value.contractAddress,
    Erc721Abi,
    'transferFrom',
    [
      ethAccountStore.accountAddress,
      formValue.value.toAddress,
      formValue.value.tokenId,
    ]
  )
}
</script>
<style lang="scss" scoped>
.button {
  width: 100%;
}
</style>
