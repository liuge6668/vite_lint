<template>
  <div class="step2">
    <h2>步骤二：需求分析</h2>
    <p>进行需求分析的内容...</p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户需求">
        <el-input v-model="form.requirements" type="textarea" placeholder="请输入用户需求" />
      </el-form-item>
      <el-form-item label="功能优先级">
        <el-select v-model="form.priority" placeholder="选择优先级">
          <el-option label="高" value="high" />
          <el-option label="中" value="medium" />
          <el-option label="低" value="low" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  requirements: '',
  priority: '',
})
</script>

<style scoped>
.step2 {
  padding: 20px;
}
</style>