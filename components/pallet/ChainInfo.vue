<template>
  Connection state:
  <b>{{ apiState }}</b>
</template>
<script lang="ts" setup>
import { useSubstrateStore } from '@/store/substrate'

const substrateStore = useSubstrateStore()

const { apiState } = toRefs(substrateStore.$state)
</script>
