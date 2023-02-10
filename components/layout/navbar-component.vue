<template>
  <n-grid cols="1 m:1" responsive="screen" class="wrapper">
    <n-gi span="0 m:1">
      <n-space justify="space-between" style="width: 98%" :wrap-item="false">
        <n-space justify="start" align="center" :wrap-item="false">
          <img
            src="/images/sub-scaffold.png"
            alt="sub-scaffold"
            class="subscaffold"
          />
          <n-menu
            v-model:value="activeKey"
            mode="horizontal"
            :options="menuOptions"
            colapsed
          />
        </n-space>
        <n-space align="center" :wrap-item="false">
          <account-component />
          <dark-mode
            v-if="darkTheme"
            class="themeIcon"
            @click="mainStore.changeTheme()"
          />
          <light-mode
            v-else
            class="themeIcon"
            @click="mainStore.changeTheme()"
          />
        </n-space>
      </n-space>
    </n-gi>
    <n-gi span="1 m:0">
      <n-space justify="start" vertical>
        <n-space justify="space-between" align="center" :wrap-item="false">
          <img
            src="/images/sub-scaffold.png"
            alt="sub-scaffold"
            class="subscaffold"
          />
          <n-space
            class="mobile-menu"
            justify="end"
            align="center"
            :wrap-item="false"
          >
            <account-component>Select account</account-component>
            <n-menu
              v-model:value="activeKey"
              :options="mobileMenuOptions"
              :default-expanded-keys="['menu']"
              dropdown-placement="top-start"
              mode="horizontal"
              colapsed
            />
          </n-space>
        </n-space>
      </n-space>
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
import {
  AppsFilled as AppsIcon,
  CycloneFilled as CycloneIcon,
  DarkModeFilled as DarkMode,
  DarkModeTwotone as LightMode,
  MenuFilled as MenuIcon,
  HomeFilled as HomeIcon,
} from '@vicons/material'
import type { MenuOption } from 'naive-ui'
import { NIcon, NMenu, NSpace, NGrid, NGi } from 'naive-ui'
import { Component, h, ref } from 'vue'
import AccountComponent from '@/components/account/account-component.vue'

const mainStore = useMainStore()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const darkTheme = computed(() => mainStore.darkTheme)

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: '/',
        },
        'Home'
      ),
    key: 'home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '/teleport',
        },
        'Teleport'
      ),
    key: 'teleport',
    icon: renderIcon(CycloneIcon),
  },
]

const mobileMenuOptions: MenuOption[] = [
  {
    key: 'menu',
    icon: renderIcon(MenuIcon),
    children: menuOptions,
  },
]
const activeKey = ref<string | null>(null)
</script>

<style lang="scss">
.wrapper {
  width: 100%;
  padding: 20px;
}
.mobile-menu {
  margin-right: 10px;
}
.subscaffold {
  width: 120px;
  margin-left: 20px;
}
.themeIcon {
  width: 30px;
  cursor: pointer;
}

.bsx-icon {
  width: 17px;
  height: 17px;
}
</style>
