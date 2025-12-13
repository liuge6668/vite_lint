<template>
  <div class="logo-container" @click="generateNewLogo">
    <div class="logo-icon" :style="{ backgroundColor: logoColor }">
      {{ logoText }}
    </div>
    <span class="logo-text">管理系统</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 预定义的颜色数组
const colors = [
  '#409eff',
  '#67c23a',
  '#e6a23c',
  '#f56c6c',
  '#909399',
  '#c71585',
  '#ff6347',
  '#32cd32',
  '#ffd700',
  '#00ced1',
  '#ff69b4',
  '#87ceeb',
]

// 预定义的文字数组
const texts = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'M',
  'N',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

const logoColor = ref('#409eff')
const logoText = ref('M')

// 生成随机logo
const generateNewLogo = () => {
  logoColor.value = colors[Math.floor(Math.random() * colors.length)]
  logoText.value = texts[Math.floor(Math.random() * texts.length)]
}

// 组件挂载时生成初始logo
onMounted(() => {
  generateNewLogo()
})
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.logo-container:hover {
  background-color: var(--bg-tertiary);
}

.logo-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-color);
}
</style>
