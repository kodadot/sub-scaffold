<template>
  <n-space>
    <n-form-item
      label="Address test:"
      :validation-status="getValidationStatus(error)"
      :feedback="error ? error : undefined"
    >
      <n-input
        v-model:value="address"
        placeholder="Address"
        @change="handleInput"
        autosize
        style="min-width: 300px"
      />
    </n-form-item>
  </n-space>
</template>
<script lang="ts" setup>
import { checkAddress, isAddress } from '@polkadot/util-crypto'
import { NFormItem, NInput, NSpace } from 'naive-ui'

const props = defineProps({
  strict: {
    type: Boolean,
    default: false,
  },
  emptyOnError: {
    type: Boolean,
    default: false,
  },
})

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
    const [, err] = checkAddress(value, correctAddressFormat(ss58Format.value))
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
