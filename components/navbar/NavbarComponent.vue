<template>
  <n-space justify="space-between">
    <n-menu
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
    />
    <WalletComponent />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, h, ref, Component } from 'vue'
import { NIcon, NMenu, NSpace } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  BookFilled as BookIcon,
  PersonAddAlt1Filled as PersonIcon,
  HomeFilled as HomeIcon,
} from '@vicons/material'
import WalletComponent from '../wallet/WalletComponent.vue'

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

export default defineComponent({
  components: {
    NMenu,
    NIcon,
    NSpace,
  },
  setup() {
    return {
      activeKey: ref<string | null>(null),
      menuOptions,
    }
  },
})
</script>
