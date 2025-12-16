<template>
  <MixLayout v-if="layoutStore.currentLayout === 'mix'" />
  <SideLayout v-else-if="layoutStore.currentLayout === 'side'" />
  <TopLayout v-else />
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'
import MixLayout from './components/MixLayout.vue'
import SideLayout from './components/SideLayout.vue'
import TopLayout from './components/TopLayout.vue'

const layoutStore = useLayoutStore()
</script>

