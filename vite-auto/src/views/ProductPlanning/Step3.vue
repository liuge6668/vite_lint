<template>
  <div class="step3">
    <h2>步骤三：规划制定</h2>
    <p>制定产品规划的内容...</p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="规划名称">
        <el-input v-model="form.planName" placeholder="请输入规划名称" />
      </el-form-item>
      <el-form-item label="时间表">
        <el-date-picker v-model="form.timeline" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item label="预算">
        <el-input-number v-model="form.budget" :min="0" :precision="2" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  planName: '',
  timeline: [],
  budget: 0,
})
</script>

<style scoped>
.step3 {
  padding: 20px;
}
</style>