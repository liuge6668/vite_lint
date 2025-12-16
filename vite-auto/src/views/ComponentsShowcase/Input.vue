<template>
  <div class="component-showcase">
    <h2>Input 输入框</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <el-input v-model="input1" placeholder="请输入内容" />
    </div>

    <div class="demo-section">
      <h3>密码框</h3>
      <el-input v-model="input2" type="password" placeholder="请输入密码" />
    </div>

    <div class="demo-section">
      <h3>带图标的输入框</h3>
      <el-input v-model="input3" placeholder="请输入内容">
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>

<style scoped>
.demo-section {
  margin-bottom: 30px;
}

.demo-section h3 {
  margin-bottom: 10px;
  color: #409eff;
}
</style>