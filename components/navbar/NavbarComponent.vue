<template>
  <n-space justify="space-between">
    <n-menu
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
    />
    <client-only>
      <layout-select />
      <wallet-component />
      <template #fallback>
        <n-button style="margin: 10px" disabled> Loading wallets... </n-button>
      </template>
    </client-only>
  </n-space>
</template>

<script lang="ts" setup>
import LayoutSelect from '@/components/utils/LayoutSelect.vue'
import WalletComponent from '@/components/wallet/WalletComponent.vue'
import {
  AutoFixNormalFilled as MagicIcon,
  BookFilled as BookIcon,
  HomeFilled as HomeIcon,
} from '@vicons/material'
import type { MenuOption } from 'naive-ui'
import { NButton, NIcon, NMenu, NSpace } from 'naive-ui'
import { Component, h, ref } from 'vue'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: '/',
        },
        { default: () => 'Home' }
      ),
    key: 'home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '/paraspell',
        },
        { default: () => 'Paraspell' }
      ),
    key: 'paraspell',
    icon: renderIcon(MagicIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://github.com/kodadot/sub-scaffold',
          target: '_blank',
          rel: 'noopenner noreferrer',
        },
        'Github '
      ),
    key: 'github',
    icon: renderIcon(BookIcon),
  },
]

const activeKey = ref<string | null>(null)
</script>
