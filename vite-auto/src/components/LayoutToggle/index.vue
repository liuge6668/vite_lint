<template>
  <el-dropdown @command="handleCommand">
    <el-button type="text">
      <el-icon>
        <Grid v-if="currentLayout === 'mix'" />
        <Menu v-else-if="currentLayout === 'side'" />
        <Expand v-else />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="mix" :class="{ 'is-active': currentLayout === 'mix' }">
          <el-icon><Grid /></el-icon>
          <span>经典布局</span>
        </el-dropdown-item>
        <el-dropdown-item command="side" :class="{ 'is-active': currentLayout === 'side' }">
          <el-icon><Menu /></el-icon>
          <span>侧边布局</span>
        </el-dropdown-item>
        <el-dropdown-item command="top" :class="{ 'is-active': currentLayout === 'top' }">
          <el-icon><Expand /></el-icon>
          <span>顶部布局</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { Grid, Menu, Expand } from '@element-plus/icons-vue'
import { computed } from 'vue'

import type { LayoutType } from '@/stores/layout'

import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

const currentLayout = computed(() => layoutStore.currentLayout)

const handleCommand = (command: string) => {
  layoutStore.setLayout(command as LayoutType)
}
</script>

<style scoped>
.el-button {
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.el-button:hover {
  background-color: var(--bg-tertiary);
}

:deep(.el-dropdown-menu__item.is-active) {
  background-color: var(--primary-color);
  color: white;
}

:deep(.el-dropdown-menu__item.is-active:hover) {
  background-color: var(--primary-color);
}
</style>
