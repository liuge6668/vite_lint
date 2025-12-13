import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<Theme>('light')

  // 从localStorage加载主题设置
  const loadThemeFromStorage = () => {
    const storedTheme = localStorage.getItem('theme') as Theme
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      currentTheme.value = storedTheme
    }
  }

  // 设置主题
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem('theme', theme)
    applyTheme(theme)
  }

  // 切换主题
  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // 应用主题到DOM
  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
  }

  // 初始化主题
  const initTheme = () => {
    loadThemeFromStorage()
    applyTheme(currentTheme.value)
  }

  // 监听主题变化
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  })

  return {
    currentTheme,
    setTheme,
    toggleTheme,
    initTheme,
    loadThemeFromStorage,
  }
})
