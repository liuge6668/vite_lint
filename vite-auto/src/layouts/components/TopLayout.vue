<template>
  <!-- Top布局：顶部菜单栏，无侧边??-->
  <div class="layout-container layout-top">
    <!-- 顶部导航??-->
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
                v-for="item in menuItemsTop"
                :key="item.path"
                :command="item.path"
                :class="{ 'is-active': $route.path === item.path }"
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
      item.children = route.children
        .filter((child) => child.meta?.menu !== false && child.meta?.title && hasPermission(child))
        .map((child) => {
          // 构造完整路??
          const fullPath = child.path.startsWith('/') ? child.path : `${route.path}/${child.path}`
          
          return {
            path: fullPath,
            title: child.meta?.title as string,
            icon: iconMap[child.meta?.icon as keyof typeof iconMap] || item.icon,
          }
        })
    }

    return item
  })
})

const menuItemsTop = computed(() => {
  const allItems: any[] = []
  const addItems = (items: any[]) => {
    items.forEach(item => {
      allItems.push(item)
      if (item.children && item.children.length > 0) {
        addItems(item.children)
      }
    })
  }
  addItems(menuItems.value)
  return allItems
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

.layout-main-top {
  flex: 1;
  padding: 20px;
  background-color: var(--bg-secondary);
  overflow: auto;
}
</style>