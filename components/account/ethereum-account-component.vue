<template>
  <n-dropdown v-if="ethAccountStore.accountAddress" :options="options">
    <n-button @click="connectWallet">
      {{ ethAccountStore.getAddressShort() }}
      <span class="icon"><RefreshRound /></span>
    </n-button>
  </n-dropdown>
  <n-button v-else @click="connectWallet">
    <span>Connect wallet</span>
  </n-button>
</template>
<script setup lang="ts">
import { NButton, NDropdown } from 'naive-ui'
// eslint-disable-next-line import/no-named-as-default
import BigNumber from 'bignumber.js'
import { RefreshRound } from '@vicons/material'

const ethAccountStore = useEthereumAccountStore()
const notificationStore = useNotificationStore()

const getFormattedBalance = () => {
  const balance = ethAccountStore.balance
  if (balance) {
    const formattedBalance =
      BigNumber(balance)
        .dividedBy(
          10 ** Number(useRuntimeConfig().public.ETH_NATIVE_CURRENCY_DECIMALS)
        )
        .toPrecision(5)
        .toString() +
      ' ' +
      useRuntimeConfig().public.ETH_NATIVE_CURRENCY_SYMBOL
    return formattedBalance
  }
  return 'N/A'
}

const connectWallet = async () => {
  try {
    await ethAccountStore.connectWallet()
    options.value[0].label = getFormattedBalance()
  } catch (err: any) {
    notificationStore.create('Error', err.message, NotificationType.Error)
  }
}

const copyFullAddress = async () => {
  if (ethAccountStore.accountAddress) {
    await navigator.clipboard.writeText(ethAccountStore.accountAddress)
    notificationStore.create('Info', 'Address coppied to clipboard!')
  }
}

const options = ref([
  {
    label: getFormattedBalance(),
    key: 'balance',
  },
  {
    label: 'Copy full address',
    key: 'copy',
    props: {
      onClick: copyFullAddress,
    },
  },
])
</script>

<style lang="scss">
.icon {
  width: 20px;
  padding-left: 10px;
}
</style>
