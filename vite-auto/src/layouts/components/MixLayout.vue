<template>
  <!-- Mix布局：经典布局，侧边栏 + 顶部??-->
  <el-container class="layout-container">
    <!-- 侧边??-->
    <el-aside :width="sidebarWidth" class="layout-sidebar">
      <!-- 侧边栏头??-->
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
        :default-openeds="defaultOpened"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        unique-opened
        :collapse="sidebarCollapsed"
        :collapse-transition="false"
      >
        <template v-for="item in menuItems" :key="item.path">
          <MenuItem :item="item" :sidebar-collapsed="sidebarCollapsed" />
        </template>
      </el-menu>
    </el-aside>

    <!-- 主内容区??-->
    <el-container>
      <!-- 顶部工具??-->
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

      <!-- 面包屑导??-->
      <Breadcrumb />

      <!-- 内容区域 -->
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {
  Fold,
  Expand,
  ArrowDown,
  HomeFilled,
  InfoFilled,
  DataLine,
  Tools,
  Plus,
  Calendar,
  Grid,
  EditPen,
  Edit,
  MessageBox,
  Check,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LayoutToggle from '@/components/LayoutToggle/index.vue'
import Logo from '@/components/Logo/index.vue'
import ThemeToggle from '@/components/ThemeToggle/index.vue'
import MenuItem from './MenuItem.vue'
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
  EditPen,
  Grid,
  Edit,
  MessageBox,
  ArrowDown,
  Check,
  Tools,
}

const menuItems = computed(() => {
  // 获取所有符合条件的路由
  const allRoutes = router.getRoutes().filter((route) => {
    return (
      route.meta?.layout !== false && // 只有layout为false的页面不参与菜单逻辑
      route.meta?.menu !== false && // menu为false时不显示在菜单中
      route.meta?.title &&
      hasPermission(route)
    )
  })

  // 分离顶级路由和子路由
  const topLevelRoutes = allRoutes.filter(route =>
    route.path.split('/').filter(Boolean).length === 1
  )

  const menuItemRoutes = [...topLevelRoutes]

  // 处理每个顶级路由
  return menuItemRoutes.map((route) => {
    const item = {
      path: route.path,
      title: route.meta?.title as string,
      icon: iconMap[route.meta?.icon as keyof typeof iconMap],
      children: [] as any[],
    }

    // 如果有子路由，添加到children
    if (route.children && route.children.length > 0) {
      const processChildren = (children: any[], parentPath: string) => {
        return children
          .filter((child) => child.meta?.menu !== false && child.meta?.title && hasPermission(child))
          .map((child) => {
            // 构造完整路径
            const fullPath = child.path.startsWith('/') ? child.path : `${parentPath}/${child.path}`

            const childItem = {
              path: fullPath,
              title: child.meta?.title as string,
              icon: iconMap[child.meta?.icon as keyof typeof iconMap] || item.icon,
              children: [] as any[],
            }

            if (child.children && child.children.length > 0) {
              childItem.children = processChildren(child.children, fullPath)
            }

            return childItem
          })
      }

      item.children = processChildren(route.children, route.path)
    }

    return item
  })
})

const defaultOpened = computed(() => {
  const opened: string[] = []
  menuItems.value.forEach(item => {
    if (item.children && item.children.some((child: any) => child.path === route.path)) {
      opened.push(item.path)
    }
  })
  return opened
})

const hasPath = (items: any[], path: string): boolean => {
  for (const item of items) {
    if (item.path === path) return true
    if (item.children && hasPath(item.children, path)) return true
  }
  return false
}

const findActiveParent = (items: any[], currentPath: string): string => {
  for (const item of items) {
    if (item.path === currentPath) return item.path
    if (item.children && hasPath(item.children, currentPath)) {
      return item.path
    }
  }
  return currentPath
}

const activeParent = computed(() => {
  return findActiveParent(menuItems.value, route.path)
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
  gap: 16px;
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

/* 侧边栏菜单样式 */
.el-menu-vertical-demo {
  border-right: none;
  min-height: calc(100vh - 60px);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu-vertical-demo :deep(.el-menu-item) {
  background-color: var(--sidebar-bg) !important;
  color: var(--sidebar-text) !important;
}

.el-menu-vertical-demo :deep(.el-menu-item:hover) {
  background-color: #2c3e50 !important;
  color: #fff !important;
}

.el-menu-vertical-demo :deep(.el-menu-item.is-active) {
  background-color: #1890ff !important;
  color: #fff !important;
}

.el-menu-vertical-demo :deep(.el-sub-menu__title) {
  background-color: var(--sidebar-bg) !important;
  color: var(--sidebar-text) !important;
}

.el-menu-vertical-demo :deep(.el-sub-menu__title:hover) {
  background-color: #2c3e50 !important;
  color: #fff !important;
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

/* 菜单标题样式 */
.menu-title {
  margin-left: 8px;
  transition: opacity 0.3s ease;
}
</style>