import { defineStore } from 'pinia'
import { ref } from 'vue'

export type LayoutType = 'mix' | 'side' | 'top'

export const useLayoutStore = defineStore('layout', () => {
  const currentLayout = ref<LayoutType>('mix')

  // 从localStorage加载布局设置
  const loadLayoutFromStorage = () => {
    const storedLayout = localStorage.getItem('layout') as LayoutType
    if (storedLayout && ['mix', 'side', 'top'].includes(storedLayout)) {
      currentLayout.value = storedLayout
    }
  }

  // 设置布局
  const setLayout = (layout: LayoutType) => {
    currentLayout.value = layout
    localStorage.setItem('layout', layout)
  }

  // 切换到下一个布局
  const toggleLayout = () => {
    const layouts: LayoutType[] = ['mix', 'side', 'top']
    const currentIndex = layouts.indexOf(currentLayout.value)
    const nextIndex = (currentIndex + 1) % layouts.length
    setLayout(layouts[nextIndex])
  }

  // 初始化布局
  const initLayout = () => {
    loadLayoutFromStorage()
  }

  return {
    currentLayout,
    setLayout,
    toggleLayout,
    initLayout,
    loadLayoutFromStorage,
  }
})
