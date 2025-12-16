<template>
  <div class="components-showcase">
    <div class="sidebar">
      <el-menu :default-active="$route.path" @select="handleSelect">
        <el-menu-item v-for="component in components" :key="component.path" :index="component.path">
          <el-icon><component :is="component.icon" /></el-icon>
          <span>{{ component.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Plus, Edit, Grid, MessageBox, ArrowDown, Check } from '@element-plus/icons-vue'

const router = useRouter()

const components = [
  { path: '/components-showcase/button', title: 'Button 按钮', icon: Plus },
  { path: '/components-showcase/input', title: 'Input 输入框', icon: Edit },
  { path: '/components-showcase/table', title: 'Table 表格', icon: Grid },
  { path: '/components-showcase/dialog', title: 'Dialog 对话框', icon: MessageBox },
  { path: '/components-showcase/select', title: 'Select 选择器', icon: ArrowDown },
  { path: '/components-showcase/switch', title: 'Switch 开关', icon: Check },
]

const handleSelect = (key: string) => {
  router.push(key)
}
</script>

<style scoped>
.components-showcase {
  display: flex;
  height: 100%;
}

.sidebar {
  width: 200px;
  border-right: 1px solid #e4e7ed;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>