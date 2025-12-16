<template>
  <div class="component-showcase">
    <h2>Select 选择器</h2>

    <div class="demo-section">
      <h3>基础选择器</h3>
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <div class="demo-section">
      <h3>多选选择器</h3>
      <el-select
        v-model="value2"
        multiple
        placeholder="请选择"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <div class="demo-section">
      <h3>可过滤的选择器</h3>
      <el-select v-model="value3" filterable placeholder="请输入关键词">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref([])
const value3 = ref('')

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
  { value: 'option4', label: '选项4' },
  { value: 'option5', label: '选项5' },
]
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