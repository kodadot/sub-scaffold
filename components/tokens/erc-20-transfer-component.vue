<template>
  <n-form>
    <n-form-item label="Token contract address">
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
    <n-form-item label="Amount to send">
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
      <p>To see your actual token balance please fill out following inputs:</p>
      <ul>
        <li>Token contract address</li>
      </ul>
    </n-alert>
    <n-card> Token balance: {{ currentTokenBalance }}</n-card>
  </n-form>
</template>
<script lang="ts" setup>
import { NFormItem, NForm, NInput, NAlert, NCard, NButton } from 'naive-ui'
import Web3 from 'web3'
import Erc20Abi from '~~/abis/erc20-abi.json'
const ethAccountStore = useEthereumAccountStore()

const currentTokenBalance = ref(0)
const formValue = ref({
  contractAddress: '',
  toAddress: '',
  amount: 0,
})

const getCurrentBalance = async (contractAddress: string) => {
  if (!Web3.utils.isAddress(contractAddress)) return
  const balance = await ethAccountStore.readContractFunction(
    contractAddress,
    Erc20Abi,
    'balanceOf',
    [ethAccountStore.accountAddress]
  )
  const decimals = await ethAccountStore.readContractFunction(
    contractAddress,
    Erc20Abi,
    'decimals',
    []
  )
  currentTokenBalance.value = balance / 10 ** decimals
}

const transferToken = async () => {
  const decimals = await ethAccountStore.readContractFunction(
    formValue.value.contractAddress,
    Erc20Abi,
    'decimals',
    []
  )
  const value = formValue.value.amount * 10 ** decimals
  await ethAccountStore.callContractFunction(
    formValue.value.contractAddress,
    Erc20Abi,
    'transfer',
    [formValue.value.toAddress, value]
  )
}
</script>
<style lang="scss" scoped>
.button {
  width: 100%;
}
</style>
