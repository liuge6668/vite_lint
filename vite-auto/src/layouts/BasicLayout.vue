<template>
  <!-- Mix布局：经典布局，侧边栏 + 顶部栏 -->
  <el-container v-if="layoutStore.currentLayout === 'mix'" class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="sidebarWidth" class="layout-sidebar">
      <!-- 侧边栏头部 -->
      <div class="sidebar-header">
        <el-button
          type="text"
          size="small"
          @click="toggleSidebar"
          :disabled="isTransitioning"
          class="sidebar-collapse-btn"
          :class="{ collapsed: sidebarCollapsed }"
        >
          <el-icon><component :is="sidebarCollapsed ? Expand : Fold" /></el-icon>
        </el-button>
      </div>

      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        unique-opened
        :class="{ 'sidebar-collapsed': sidebarCollapsed }"
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <span v-if="!sidebarCollapsed" class="menu-title">{{ item.title }}</span>
        </el-menu-item>

        <!-- 工具子菜单 -->
        <el-sub-menu v-if="toolItems.length > 0" index="tools">
          <template #title>
            <el-icon><Tools /></el-icon>
            <span v-if="!sidebarCollapsed" class="menu-title">工具</span>
          </template>
          <el-menu-item
            v-for="item in toolItems"
            :key="item.path"
            :index="item.path"
            class="tool-menu-item"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <span v-if="!sidebarCollapsed" class="menu-title">{{ item.title }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 主内容区域 -->
    <el-container>
      <!-- 顶部工具栏 -->
      <el-header class="layout-header">
        <div class="header-left">
          <Logo />
        </div>
        <div class="header-right">
          <LayoutToggle />
          <ThemeToggle />
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userStore.user?.name || '未登录' }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                <el-dropdown-item command="settings">设置</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 面包屑导航 -->
      <Breadcrumb />

      <!-- 内容区域 -->
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>

  <!-- Side布局：侧边栏贯通上下 -->
  <el-container v-else-if="layoutStore.currentLayout === 'side'" class="layout-container">
    <!-- 侧边栏（贯通） -->
    <el-aside :width="sidebarWidth" class="layout-sidebar layout-sidebar-full">
      <!-- 顶部区域 -->
      <div class="sidebar-header">
        <Logo v-if="!sidebarCollapsed && layoutStore.currentLayout === 'side'" />
        <el-button
          type="text"
          size="small"
          @click="toggleSidebar"
          :disabled="isTransitioning"
          class="sidebar-collapse-btn"
          :class="{ collapsed: sidebarCollapsed }"
        >
          <el-icon><component :is="sidebarCollapsed ? Expand : Fold" /></el-icon>
        </el-button>
      </div>

      <!-- 菜单区域 -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo sidebar-menu"
        @select="handleSelect"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        unique-opened
        :class="{ 'sidebar-collapsed': sidebarCollapsed }"
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <span v-if="!sidebarCollapsed" class="menu-title">{{ item.title }}</span>
        </el-menu-item>

        <!-- 工具子菜单 -->
        <el-sub-menu v-if="toolItems.length > 0" index="tools">
          <template #title>
            <el-icon><Tools /></el-icon>
            <span v-if="!sidebarCollapsed" class="menu-title">工具</span>
          </template>
          <el-menu-item
            v-for="item in toolItems"
            :key="item.path"
            :index="item.path"
            class="tool-menu-item"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <span v-if="!sidebarCollapsed" class="menu-title">{{ item.title }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>

      <!-- 底部工具区域 -->
      <div class="sidebar-footer" :class="{ collapsed: sidebarCollapsed }">
        <div v-if="!sidebarCollapsed" class="sidebar-footer-content">
          <LayoutToggle />
          <ThemeToggle />
          <el-dropdown @command="handleCommand">
            <span class="sidebar-user-footer">
              <el-avatar :size="24">{{ userStore.user?.name?.charAt(0) }}</el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                <el-dropdown-item command="settings">设置</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- 收起状态下的hover菜单 -->
        <div v-else class="sidebar-footer-hover">
          <el-dropdown @command="handleCommand" trigger="hover">
            <span class="sidebar-user-footer">
              <el-avatar :size="24">{{ userStore.user?.name?.charAt(0) }}</el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="() => layoutStore.toggleLayout()">
                  <el-icon><Grid /></el-icon>
                  <span>切换到Mix布局</span>
                </el-dropdown-item>
                <el-dropdown-item @click="() => ElMessage.info('主题切换功能开发中...')">
                  <el-icon><Sunny /></el-icon>
                  <span>切换主题</span>
                </el-dropdown-item>
                <el-dropdown-item divided command="profile">
                  <el-icon><User /></el-icon>
                  <span>个人资料</span>
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  <el-icon><Setting /></el-icon>
                  <span>设置</span>
                </el-dropdown-item>
                <el-dropdown-item command="logout" divided>
                  <el-icon><SwitchButton /></el-icon>
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-aside>

    <!-- 主内容区域 -->
    <el-container>
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>

  <!-- Top布局：顶部菜单栏，无侧边栏 -->
  <div v-else class="layout-container layout-top">
    <!-- 顶部导航栏 -->
    <el-header class="layout-header layout-header-top">
      <div class="header-left">
        <Logo />
        <el-dropdown trigger="hover" @command="handleSelect">
          <span class="nav-menu-trigger">
            <el-icon><Menu /></el-icon>
            <span>菜单</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in menuItems"
                :key="item.path"
                :command="item.path"
                :class="{ 'is-active': $route.path === item.path }"
              >
                <el-icon><component :is="item.icon" /></el-icon>
                <span>{{ item.title }}</span>
              </el-dropdown-item>

              <!-- 工具子菜单 -->
              <el-dropdown-item v-if="toolItems.length > 0" divided disabled>
                <el-icon><Tools /></el-icon>
                <span>工具</span>
              </el-dropdown-item>
              <el-dropdown-item
                v-for="item in toolItems"
                :key="item.path"
                :command="item.path"
                :class="{ 'is-active': $route.path === item.path }"
                class="tool-menu-item"
              >
                <el-icon><component :is="item.icon" /></el-icon>
                <span>{{ item.title }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="header-right">
        <LayoutToggle />
        <ThemeToggle />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userStore.user?.name || '未登录' }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人资料</el-dropdown-item>
              <el-dropdown-item command="settings">设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 内容区域 -->
    <el-main class="layout-main layout-main-top">
      <router-view />
    </el-main>
  </div>
</template>

<script setup lang="ts">
import {
  Fold,
  Expand,
  ArrowDown,
  HomeFilled,
  InfoFilled,
  DataLine,
  Menu,
  Tools,
  Plus,
  Calendar,
  Grid,
  Sunny,
  User,
  Setting,
  SwitchButton,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LayoutToggle from '@/components/LayoutToggle/index.vue'
import Logo from '@/components/Logo/index.vue'
import ThemeToggle from '@/components/ThemeToggle/index.vue'
import { useLayoutStore } from '@/stores/layout'
import { useUserStore } from '@/stores/user'
import { hasPermission } from '@/utils/permission'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const layoutStore = useLayoutStore()

const sidebarCollapsed = ref(false)
const isTransitioning = ref(false)

const sidebarWidth = computed(() => {
  return sidebarCollapsed.value ? '64px' : '200px'
})

const iconMap = {
  HomeFilled,
  InfoFilled,
  DataLine,
  Plus,
  Calendar,
}

const menuItems = computed(() => {
  return router
    .getRoutes()
    .filter((route) => {
      return (
        route.meta?.layout !== false && // 只有layout为false的页面不参与菜单逻辑
        route.meta?.menu !== false && // menu为false时不显示在菜单中
        route.meta?.tools !== true && // tools为true的显示在工具栏，不显示在主菜单
        route.meta?.title &&
        hasPermission(route)
      )
    })
    .map((route) => ({
      path: route.path,
      title: route.meta?.title as string,
      icon: iconMap[route.meta?.icon as keyof typeof iconMap],
    }))
})

const toolItems = computed(() => {
  return router
    .getRoutes()
    .filter((route) => {
      return (
        route.meta?.layout !== false && // 只有layout为false的页面不参与菜单逻辑
        route.meta?.tools === true && // tools为true时显示在工具栏
        route.meta?.title &&
        hasPermission(route)
      )
    })
    .map((route) => ({
      path: route.path,
      title: route.meta?.title as string,
      icon: iconMap[route.meta?.icon as keyof typeof iconMap],
    }))
})

const toggleSidebar = () => {
  if (isTransitioning.value) return

  isTransitioning.value = true
  sidebarCollapsed.value = !sidebarCollapsed.value

  // 过渡结束后重置状态
  setTimeout(() => {
    isTransitioning.value = false
  }, 300) // 与CSS过渡时间一致
}

const handleSelect = (key: string) => {
  router.push(key)
}

const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      // 跳转到设置页
      ElMessage.info('设置页面开发中...')
      break
    case 'logout':
      userStore.logout()
      router.push('/login')
      break
  }
}

onMounted(() => {
  // 检查用户登录状态
  if (!userStore.isLoggedIn && route.meta?.requiresAuth) {
    router.push('/login')
  }
})
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.layout-sidebar {
  background-color: var(--sidebar-bg);
  transition: width 0.3s ease;
  overflow: hidden;
}

.layout-header {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-right {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--primary-color);
  display: flex;
  align-items: center;
}

.layout-main {
  padding: 20px;
  background-color: var(--bg-secondary);
}

/* Side布局样式 */
.layout-sidebar-full {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--sidebar-bg);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  box-sizing: border-box;
}

.sidebar-collapse-btn {
  color: var(--text-secondary);
  transition: all 0.3s ease;
  border-radius: 4px;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-collapse-btn:hover:not(:disabled) {
  color: var(--primary-color);
  background-color: var(--bg-tertiary);
}

.sidebar-collapse-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* handle按钮固定在左侧 */

.sidebar-menu {
  flex: 1;
  border: none;
}

.sidebar-menu :deep(.el-menu-item) {
  border-right: none !important;
}

.sidebar-menu :deep(.el-menu) {
  border-right: none !important;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid var(--border-color);
  background-color: var(--sidebar-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.sidebar-footer.collapsed {
  padding: 8px;
  justify-content: center;
}

.sidebar-footer-hover {
  width: 100%;
  display: flex;
  justify-content: center;
}

.sidebar-user-footer {
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.sidebar-user-footer:hover {
  background-color: var(--bg-tertiary);
}

/* Top布局样式 */
.layout-top {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header-top {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 64px;
}

.nav-menu-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-primary);
  transition: background-color 0.3s ease;
  border-right: 1px solid var(--border-color);
}

.nav-menu-trigger:hover,
.nav-tools-trigger:hover {
  background-color: var(--bg-tertiary);
}

.nav-tools-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-primary);
  transition: background-color 0.3s ease;
  margin-right: 16px;
}

:deep(.el-dropdown-menu__item.is-active) {
  background-color: var(--primary-color);
  color: white;
}

:deep(.el-dropdown-menu__item.is-active:hover) {
  background-color: var(--primary-color);
}

/* 侧边栏折叠样式 */
.sidebar-collapsed :deep(.el-menu-item) {
  padding-right: 0 !important;
}

.sidebar-collapsed :deep(.el-sub-menu__title) {
  padding-right: 0 !important;
}

/* 菜单标题样式 */
.menu-title {
  margin-left: 8px;
  transition: opacity 0.3s ease;
}

/* 工具菜单项样式 */
.tool-menu-item {
  padding-left: 20px;
}

.tool-menu-item :deep(.el-menu-item) {
  padding-left: 50px !important;
}

.logo {
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-color);
}

.layout-main-top {
  flex: 1;
  padding: 20px;
  background-color: var(--bg-secondary);
  overflow: auto;
}
</style>
