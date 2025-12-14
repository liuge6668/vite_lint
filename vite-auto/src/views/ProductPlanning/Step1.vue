<template>
  <div class="step1">
    <h2>步骤一：市场调研</h2>
    <p>进行市场调研的内容...</p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="目标市场">
        <el-input v-model="form.market" placeholder="请输入目标市场" />
      </el-form-item>
      <el-form-item label="竞争分析">
        <el-input v-model="form.competition" type="textarea" placeholder="请输入竞争分析" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  market: '',
  competition: '',
})
</script>

<style scoped>
.step1 {
  padding: 20px;
}
</style>