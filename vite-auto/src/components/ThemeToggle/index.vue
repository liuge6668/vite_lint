<template>
  <el-button
    type="text"
    @click="toggleTheme"
    :title="currentTheme === 'light' ? '切换到暗色主题' : '切换到亮色主题'"
  >
    <el-icon>
      <Sunny v-if="currentTheme === 'dark'" />
      <Moon v-else />
    </el-icon>
  </el-button>
</template>

<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { computed } from 'vue'

import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const currentTheme = computed(() => themeStore.currentTheme)

const toggleTheme = () => {
  themeStore.toggleTheme()
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
</style>
