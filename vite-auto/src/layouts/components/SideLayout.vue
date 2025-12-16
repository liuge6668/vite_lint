<template>
  <!-- Side布局：侧边栏贯通上??-->
  <el-container class="layout-container">
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
        :default-openeds="defaultOpened"
        class="el-menu-vertical-demo sidebar-menu"
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

    <!-- 主内容区??-->
    <el-container>
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
  Menu,
  Tools,
  Plus,
  Calendar,
  Grid,
  Sunny,
  User,
  Setting,
  SwitchButton,
  EditPen,
  Edit,
  MessageBox,
  Check,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

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
            // 构造完整路??
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
  // 遍历所有菜单项
  for (const item of items) {
    // 精确匹配当前路径
    if (item.path === currentPath) {
      return item.path
    }
    
    // 检查是否有子菜单匹配
    if (item.children && item.children.length > 0) {
      // 直接检查子菜单中是否包含当前路径
      const hasMatchInChildren = hasPath(item.children, currentPath)
      if (hasMatchInChildren) {
        return item.path
      }
    }
  }
  
  // 如果没有找到精确匹配，尝试匹配父路径
  // 例如 /user/profile 匹配到 /user
  const pathSegments = currentPath.split('/').filter(Boolean)
  if (pathSegments.length > 1) {
    const parentPath = '/' + pathSegments[0]
    // 确保父路径确实存在于菜单中
    const parentExists = items.some(item => item.path === parentPath)
    if (parentExists) {
      return parentPath
    }
  }
  
  // 默认返回当前路径
  return currentPath
}

const activeParent = computed(() => {
  return findActiveParent(menuItems.value, route.path)
})

const toggleSidebar = () => {
  if (isTransitioning.value) return

  isTransitioning.value = true
  sidebarCollapsed.value = !sidebarCollapsed.value

  // 过渡结束后重置状??
  setTimeout(() => {
    isTransitioning.value = false
  }, 300) // 与CSS过渡时间一??
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
  // 检查用户登录状??
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

.layout-main {
  padding: 20px;
  background-color: var(--bg-secondary);
}

/* 侧边栏菜单样式 */
.el-menu-vertical-demo {
  border-right: none;
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
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  min-height: 60px;
}

.sidebar-footer.collapsed {
  padding: 8px;
  justify-content: space-between;
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

.sidebar-footer-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

/* 菜单标题样式 */
.menu-title {
  margin-left: 8px;
  transition: opacity 0.3s ease;
}
</style>