import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { TransactionReceipt } from 'web3-core'
import BigNumber from 'bignumber.js'

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}
type State = {
  accountAddress?: string
  balance?: BigNumber
}

export const useEthereumAccountStore = defineStore({
  id: 'ethAccount',
  persist: {
    storage: persistedState.localStorage,
  },
  state: (): State => ({
    accountAddress: undefined,
    balance: undefined,
  }),

  actions: {
    async connectWallet() {
      const chainId = useRuntimeConfig().public.ETH_CHAIN_ID
      if (typeof window.ethereum === 'undefined') {
        throw new TypeError('ETH Web3 wallet not installed')
      }
      const web3 = new Web3(window.ethereum)
      if (chainId !== window.ethereum.networkVersion) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: web3.utils.toHex(chainId) }],
          })
        } catch (err: any) {
          if (err.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: useRuntimeConfig().public.ETH_CHAIN_NAME,
                  chainId: web3.utils.toHex(chainId),
                  nativeCurrency: {
                    name: useRuntimeConfig().public.ETH_NATIVE_CURRENCY_NAME,
                    decimals: Number(
                      useRuntimeConfig().public.ETH_NATIVE_CURRENCY_DECIMALS
                    ),
                    symbol:
                      useRuntimeConfig().public.ETH_NATIVE_CURRENCY_SYMBOL,
                  },
                  rpcUrls: [
                    useRuntimeConfig().public.ETH_USER_WALLET_CHAIN_RPC,
                  ],
                },
              ],
            })
          }
        }
      }
      const account = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      this.accountAddress = account[0]
      window.ethereum.on('accountsChanged', (account: string[]) => {
        this.accountAddress = account[0]
      })
      await this.refreshBalance()
    },

    getAddressShort() {
      if (this.accountAddress) {
        return `${this.accountAddress.slice(
          0,
          5
        )}...${this.accountAddress.slice(
          this.accountAddress.length - 5,
          this.accountAddress.length
        )}`
      }
    },

    async refreshBalance() {
      const web3 = new Web3(window.ethereum)
      if (this.accountAddress) {
        this.balance = BigNumber(await web3.eth.getBalance(this.accountAddress))
      }
    },

    async callContractFunction(
      contractAddress: string,
      abi: AbiItem[],
      functionName: string,
      args: any[],
      value: BigNumber = BigNumber(0),
      gas = BigNumber(300000)
    ): Promise<TransactionReceipt> {
      const web3 = new Web3(window.ethereum)
      const contract = new web3.eth.Contract(abi, contractAddress)
      return await contract.methods[functionName](...args).send({
        from: this.accountAddress,
        gas,
        value,
      })
    },

    async readContractFunction(
      contractAddress: string,
      abi: AbiItem[],
      functionName: string,
      args: any[]
    ) {
      const web3 = new Web3(window.ethereum)
      const contract = new web3.eth.Contract(abi, contractAddress)
      return await contract.methods[functionName](...args).call()
    },
  },
})
