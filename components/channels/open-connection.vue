<template>
  <n-form>
    <n-form-item label="Select source">
      <n-select
        v-if="chainsLoaded"
        v-model:value="sourceChain"
        :disabled="isLoading"
        :options="parachainSourceOptions"
        filterable
        clearable
      />
      <n-skeleton v-else size="medium" :sharp="false" />
    </n-form-item>
    <n-form-item label="Select destination">
      <n-select
        v-if="chainsLoaded"
        v-model:value="destinationChain"
        :disabled="isLoading"
        :options="parachainDestinationOptions"
        filterable
        clearable
      />
      <n-skeleton v-else size="medium" :sharp="false" />
    </n-form-item>
    <n-button
      v-if="chainsLoaded"
      type="primary"
      style="width: 100%"
      :disabled="!canOpenChannel"
      :loading="isLoading"
      @click="openChannel"
    >
      Open
    </n-button>
    <n-skeleton v-else size="medium" />
  </n-form>
</template>
<script setup lang="ts">
import {
  SelectOption,
  NSelect,
  NForm,
  NFormItem,
  NButton,
  NSkeleton,
} from 'naive-ui'

const channelStore = useChannelStore()

const chainsLoaded = computed(() => channelStore.apiConnected)

const activeChannels = computed(() => channelStore.channels)

const availibleChains = computed(() =>
  Object.entries(channelStore.parachains).map(([id, name]) => ({
    id: Number(id),
    name,
  }))
)

const sourceChain = ref<number | null>(null)
const destinationChain = ref<number | null>(null)

const doesChannelExists = (source: number, destination: number | null) =>
  destination &&
  (activeChannels.value[source]?.includes(destination) ||
    activeChannels.value[destination]?.includes(source))

/**
 * Filter out already selected chain and opened connection
 */
const parachainSourceOptions = computed<SelectOption[]>(() =>
  availibleChains.value
    .filter(
      (chain) =>
        chain.id !== destinationChain.value &&
        !doesChannelExists(chain.id, destinationChain.value)
    )
    .map((val) => ({ label: val.name, value: val.id }))
)

watch(
  () => parachainSourceOptions.value,
  (options) => {
    if (!options.find((el) => el.value === sourceChain.value)) {
      sourceChain.value = null
    }
  }
)

/**
 * Filter out already selected chain and opened connection
 */
const parachainDestinationOptions = computed<SelectOption[]>(() =>
  availibleChains.value
    .filter(
      (chain) =>
        chain.id !== sourceChain.value &&
        !doesChannelExists(chain.id, sourceChain.value)
    )
    .map((val) => ({ label: val.name, value: val.id }))
)

watch(
  () => parachainDestinationOptions.value,
  (options) => {
    if (!options.find((el) => el.value === destinationChain.value)) {
      destinationChain.value = null
    }
  }
)
/**
 * Check if source and destination was selected
 */
const canOpenChannel = computed(
  () =>
    sourceChain.value &&
    destinationChain.value &&
    !channelStore.hasActiveClosing &&
    !channelStore.hasActiveOpening
)

const isLoading = computed(
  () => channelStore.hasActiveClosing || channelStore.hasActiveOpening
)
const openChannel = () => {
  channelStore.openChannel(sourceChain.value!, destinationChain.value!)
}
</script>
