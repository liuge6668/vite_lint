<template>
  <div class="component-showcase">
    <h2>Dialog 对话框</h2>

    <div class="demo-section">
      <h3>基础对话框</h3>
      <el-button type="primary" @click="dialogVisible = true">打开对话框</el-button>

      <el-dialog v-model="dialogVisible" title="提示" width="500">
        <span>这是一段信息</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div class="demo-section">
      <h3>自定义对话框</h3>
      <el-button type="success" @click="customDialogVisible = true">自定义对话框</el-button>

      <el-dialog v-model="customDialogVisible" title="自定义" width="600" :before-close="handleClose">
        <p>自定义内容区域</p>
        <p>可以放置任何内容</p>
        <template #footer>
          <el-button @click="customDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="customDialogVisible = false">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const customDialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessage.info('关闭对话框')
  done()
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>