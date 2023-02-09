<template>
  <n-grid cols="1 l:24" x-gap="5" responsive="screen">
    <n-form-item-gi label="Send to:" span="1 l:6">
      <n-switch v-model:value="forMeSelect">
        <template #unchecked> Address </template>
        <template #unchecked-icon>
          <n-icon :component="ArrowForwardOutlined" />
        </template>
        <template #checked> Myself </template>
        <template #checked-icon>
          <n-icon :component="ArrowBackOutlined" />
        </template>
      </n-switch>
    </n-form-item-gi>
    <n-form-item-gi
      v-if="!forMeSelect"
      span="1 l:18"
      :label="label"
      :validation-status="getValidationStatus(error)"
      :feedback="error ? error : undefined"
    >
      <n-input
        v-model:value="address"
        placeholder="Address"
        style="width: 100%"
        @change="handleInput"
      />
    </n-form-item-gi>
  </n-grid>
</template>
<script lang="ts" setup>
import { checkAddress, isAddress } from '@polkadot/util-crypto'
import { ArrowBackOutlined, ArrowForwardOutlined } from '@vicons/material'
import { NFormItemGi, NInput, NGrid, NSwitch, NIcon } from 'naive-ui'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  strict: {
    type: Boolean,
    default: false,
  },
  emptyOnError: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: undefined,
  },
})

const emit = defineEmits(['update:modelValue'])

const forMeSelect = ref(false)

const { urlPrefix } = usePrefix()

const address = ref<string>('')

onMounted(() => {
  address.value = props.modelValue ?? ''
})

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
  } else if (!props.emptyOnError && !value) {
    error.value = ''
  } else {
    error.value = isAddress(value) ? '' : 'Invalid address'
  }
  if (!error.value) {
    emit('update:modelValue', value)
  }
}
</script>
<style lang="scss"></style>
