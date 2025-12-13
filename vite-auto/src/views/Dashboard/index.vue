<template>
  <div class="dashboard">
    <h1>仪表板</h1>
    <el-row :gutter="20" v-loading="loading">
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">用户数量</div>
          </template>
          <div class="statistic-number">{{ dashboardData.userCount.toLocaleString() }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">订单数量</div>
          </template>
          <div class="statistic-number">{{ dashboardData.orderCount.toLocaleString() }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">销售额</div>
          </template>
          <div class="statistic-number">¥{{ dashboardData.salesAmount.toLocaleString() }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">活跃用户</div>
          </template>
          <div class="statistic-number">{{ dashboardData.activeUsers.toLocaleString() }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 20px" v-loading="loading">
      <template #header>
        <div class="card-header">最近活动</div>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="activity in dashboardData.activities"
          :key="activity.timestamp"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'

import type { DashboardData } from '@/api/user'

import { getDashboardData } from '@/api/user'

const loading = ref(false)
const dashboardData = ref<DashboardData>({
  userCount: 0,
  orderCount: 0,
  salesAmount: 0,
  activeUsers: 0,
  activities: [],
})

const loadDashboardData = async () => {
  loading.value = true
  try {
    const response = await getDashboardData()
    dashboardData.value = response.data
  } catch (error) {
    ElMessage.error('获取仪表板数据失败')
    console.error('获取仪表板数据失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.card-header {
  font-weight: bold;
}

.statistic-number {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
  text-align: center;
}
</style>
