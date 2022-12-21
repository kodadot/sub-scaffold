<template>
  <n-space justify="space-between">
    <n-menu
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
    />
    <client-only>
      <LayoutSelect />
      <WalletComponent />
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
  BookFilled as BookIcon,
  HomeFilled as HomeIcon,
  PersonAddAlt1Filled as PersonIcon,
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
        { default: () => 'Going Home' }
      ),
    key: 'go-back-home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '/about',
        },
        { default: () => 'About' }
      ),
    key: 'about',
    icon: renderIcon(PersonIcon),
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
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon),
  },
]

const activeKey = ref<string | null>(null)
</script>
