<template>
  <div class="component-showcase">
    <h2>Table 表格</h2>

    <div class="demo-section">
      <h3>基础表格</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="age" label="年龄" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </div>

    <div class="demo-section">
      <h3>带操作的表格</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="age" label="年龄" width="180" />
        <el-table-column prop="address" label="地址" />
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  { name: '张三', age: 25, address: '北京市' },
  { name: '李四', age: 30, address: '上海市' },
  { name: '王五', age: 35, address: '广州市' },
])

const handleEdit = (row: any) => {
  ElMessage.info(`编辑 ${row.name}`)
}

const handleDelete = (row: any) => {
  ElMessage.warning(`删除 ${row.name}`)
}
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