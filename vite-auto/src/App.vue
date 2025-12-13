<template>
  <div id="app">
    <BasicLayout v-if="showLayout">
      <router-view />
    </BasicLayout>
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import BasicLayout from '@/layouts/BasicLayout.vue'
import { useLayoutStore } from '@/stores/layout'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()
const themeStore = useThemeStore()
const layoutStore = useLayoutStore()

const showLayout = computed(() => {
  return route.meta?.layout !== false
})

onMounted(() => {
  // 从localStorage加载用户状态
  userStore.loadUserFromStorage()
  // 初始化主题
  themeStore.initTheme()
  // 初始化布局
  layoutStore.initLayout()
})
</script>

<style>
/* 全局样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
