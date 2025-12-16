<template>
  <div class="component-showcase">
    <h2>Button 按钮</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <div class="demo-section">
      <h3>尺寸</h3>
      <el-button size="large">大按钮</el-button>
      <el-button>默认按钮</el-button>
      <el-button size="small">小按钮</el-button>
    </div>

    <div class="demo-section">
      <h3>禁用状态</h3>
      <el-button disabled>禁用按钮</el-button>
      <el-button type="primary" disabled>禁用主要按钮</el-button>
    </div>

    <div class="demo-section">
      <h3>加载状态</h3>
      <el-button type="primary" :loading="true">加载中</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
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