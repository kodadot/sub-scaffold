<template>
    <div>

        <h1>Welcome to settings page!</h1>
        <p>This page is for creating and managing stuffs</p>
        

        <h3>Connector for sub-api</h3>
        <NSpace>
            <NText v-model:value="subApiUrl" placeholder="Enter Sub-api url" />
            <NButton type="primary" @click="onSend">Connect</NButton>
        </NSpace>
        
        
        <span class="filler" />
    </div>
</template>

<script setup lang="ts">

import { useDefaultStore } from '@/store/default'
import { NSpace, NButton, NText } from 'naive-ui'

const store = useDefaultStore()

let subApiUrl: string = '';

const onSend = () => {
    console.log(subApiUrl);
}

</script>

<style scoped lang="scss">
.filler {
    min-height: 60vh;
    display: block;
}
</style>
  

:precision="3"
:disabled="!selectedCurrency"