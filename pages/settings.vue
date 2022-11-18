<template>
    <NSpace vertical class="wrapper">

        <h1>Welcome to settings page!</h1>
        <p>This page is for creating and managing stuffs</p>

        <h3>Connector for sub-api</h3>

        <n-input v-model:value="subApiUrl" type="text" placeholder="Enter subAPI URL"/>
        <NButton type="primary" :disabled="!canConnect" @click="onConnect">
            Connect
        </NButton>

    </NSpace>
    <span class="filler"></span>
</template>

<script lang="ts" setup>
import { useDefaultStore } from '@/store/default'
import { NSpace, NInput, NButton } from 'naive-ui'

const subApiUrl = ref<string>();
const canConnect = computed(() => subApiUrl.value !== '');

const onConnect = () => {
    console.log(subApiUrl.value);
}

</script>

<style scoped lang="scss">
.filler {
    min-height: 60vh;
    display: block;
}
.wrapper {
  margin: 10px;
  margin-top: 20px;
}
</style>
