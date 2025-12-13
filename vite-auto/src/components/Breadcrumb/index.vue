<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="item.path">
        <span
          v-if="index === breadcrumbItems.length - 1 || !item.clickable"
          class="breadcrumb-item"
          :class="{ active: index === breadcrumbItems.length - 1 }"
        >
          <el-icon v-if="item.icon && index === breadcrumbItems.length - 1">
            <component :is="item.icon" />
          </el-icon>
          {{ item.title }}
        </span>
        <a v-else href="javascript:void(0)" class="breadcrumb-link" @click="handleClick(item)">
          <el-icon v-if="item.icon">
            <component :is="item.icon" />
          </el-icon>
          {{ item.title }}
        </a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { HomeFilled, InfoFilled, DataLine, Plus, Calendar, User } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export interface BreadcrumbItem {
  title: string
  path: string
  icon?: any
  clickable: boolean
}

const router = useRouter()
const route = useRoute()

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const items: BreadcrumbItem[] = []
  const matched = route.matched

  // 如果只有一个匹配的路由（通常是当前页面），直接显示当前页面
  if (matched.length <= 1) {
    const currentMatch = matched[0]
    if (currentMatch?.meta?.title) {
      const iconMap: Record<string, any> = {
        HomeFilled,
        InfoFilled,
        DataLine,
        Plus,
        Calendar,
        User,
      }

      items.push({
        title: currentMatch.meta.title as string,
        path: currentMatch.path,
        icon: iconMap[currentMatch.meta.icon as string],
        clickable: false, // 当前页面不点击
      })
    }
    return items
  }

  // 如果有多个匹配的路由，从直接父级开始显示
  matched.forEach((match, index) => {
    if (match.meta?.title) {
      // 查找对应的图标组件
      const iconMap: Record<string, any> = {
        HomeFilled,
        InfoFilled,
        DataLine,
        Plus,
        Calendar,
        User,
      }

      // 如果是首页且不是唯一的路由，跳过首页
      if (match.path === '/' && matched.length > 1) {
        return
      }

      items.push({
        title: match.meta.title as string,
        path: match.path,
        icon: iconMap[match.meta.icon as string],
        clickable: index < matched.length - 1, // 最后一个不点击
      })
    }
  })

  return items
})

const handleClick = (item: BreadcrumbItem) => {
  if (item.clickable) {
    router.push(item.path)
  }
}
</script>

<style scoped>
.breadcrumb {
  padding: 16px 20px;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
}

.breadcrumb-item.active {
  color: var(--primary-color);
  font-weight: 500;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: var(--primary-color);
}

:deep(.el-breadcrumb__separator) {
  color: var(--text-placeholder);
}
</style>
