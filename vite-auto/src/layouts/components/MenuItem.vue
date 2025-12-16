<template>
  <el-sub-menu 
    v-if="item.children && item.children.length > 0" 
    :index="item.path"
    :class="getClassNames"
  >
    <template #title>
      <el-icon><component :is="item.icon" /></el-icon>
      <span class="menu-title">{{ item.title }}</span>
    </template>
    <MenuItem
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :sidebar-collapsed="sidebarCollapsed"
    />
  </el-sub-menu>
  <el-menu-item 
    v-else 
    :index="item.path" 
    :class="getClassNames"
  >
    <el-icon><component :is="item.icon" /></el-icon>
    <span class="menu-title">{{ item.title }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  item: any
  sidebarCollapsed: boolean
}>()

const route = useRoute()

// 检查当前路由是否是该菜单项或其子项
const isParentOfActive = computed(() => {
  // 检查当前路由是否匹配该项或其子项
  if (route.path === props.item.path) return true
  
  if (props.item.children && props.item.children.length > 0) {
    const checkChildren = (children: any[]): boolean => {
      return children.some((child) => {
        // 直接比较路径或者作为前缀匹配（处理子路由情况）
        if (route.path === child.path || route.path.startsWith(child.path + '/')) return true
        // 递归检查更深层的子项
        if (child.children && child.children.length > 0) {
          return checkChildren(child.children)
        }
        return false
      })
    }
    
    return checkChildren(props.item.children)
  }
  
  return false
})

// 检查当前项是否为激活的子项
const isActive = computed(() => {
  return route.path === props.item.path
})

const getClassNames = computed(() => {
  return {
    'active-parent': isParentOfActive.value,
    'active-child': isActive.value
  }
})
</script>

<style scoped>
.menu-title {
  margin-left: 8px;
  transition: opacity 0.3s ease;
}

.active-parent :deep(.el-sub-menu__title) {
  background-color: var(--el-color-primary) !important;
  color: var(--el-color-white) !important;
}

.active-child {
  background-color: var(--el-color-primary) !important;
  color: var(--el-color-white) !important;
}

/* 确保在菜单收起时也能正确显示激活状态 */
:deep(.el-menu--collapse .active-parent .el-sub-menu__title) {
  background-color: var(--el-color-primary) !important;
  color: var(--el-color-white) !important;
}

:deep(.el-menu--collapse .active-child) {
  background-color: var(--el-color-primary) !important;
  color: var(--el-color-white) !important;
}
</style>