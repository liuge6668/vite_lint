<template>
  <div class="component-showcase">
    <h2>Switch 开关</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <el-switch v-model="value1" />
      <p>当前状态: {{ value1 }}</p>
    </div>

    <div class="demo-section">
      <h3>自定义文字</h3>
      <el-switch
        v-model="value2"
        active-text="开"
        inactive-text="关"
      />
    </div>

    <div class="demo-section">
      <h3>自定义颜色</h3>
      <el-switch
        v-model="value3"
        active-color="#13ce66"
        inactive-color="#ff4949"
      />
    </div>

    <div class="demo-section">
      <h3>禁用状态</h3>
      <el-switch v-model="value4" disabled />
      <el-switch v-model="value5" disabled />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref(true)
const value5 = ref(false)
</script>

<style scoped>
.demo-section {
  margin-bottom: 30px;
}

.demo-section h3 {
  margin-bottom: 10px;
  color: #409eff;
}

.demo-section p {
  margin-top: 10px;
  color: #666;
}
</style>