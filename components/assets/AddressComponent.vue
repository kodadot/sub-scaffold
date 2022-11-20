<template>
  <NSpace>
    <NFormItem
      label="Address"
      :validation-status="getValidationStatus(error)"
      :feedback="error ? error : undefined"
    >
      <NInput
        v-model:value="address"
        placeholder="Address"
        @change="handleInput"
      />
    </NFormItem>
  </NSpace>
</template>
<script lang="ts" setup>
import usePrefix from '@/composables/usePrefix'
import { ss58Of } from '@/utils/config/chain.config'
import correctFormat from '@/utils/ss58Format'
import { checkAddress, isAddress } from '@polkadot/util-crypto'
import { NFormItem, NInput, NSpace } from 'naive-ui'

const props = defineProps<{
  strict: boolean
  emptyOnError: boolean
}>()

const { urlPrefix } = usePrefix()

const address = ref<string>('')

const error = ref<string | null>(null)

const getValidationStatus = (error: string | null) =>
  error ? 'error' : 'success'

const ss58Format = computed(() =>
  urlPrefix.value ? ss58Of(urlPrefix.value) : undefined
)
const handleInput = (value: string) => {
  if (props.strict) {
    const [, err] = checkAddress(value, correctFormat(ss58Format.value))
    error.value = value ? err : ''
  } else {
    if (!props.emptyOnError && !value) {
      error.value = ''
    } else {
      error.value = isAddress(value) ? '' : 'Invalid address'
    }
  }
}
</script>
<style lang="scss"></style>
