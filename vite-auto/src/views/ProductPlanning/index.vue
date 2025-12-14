<template>
  <div class="product-planning">
    <div class="main-content">
      <h1>产品规划</h1>
      <el-steps :active="activeStep" finish-status="success">
        <el-step title="步骤一" description="市场调研" @click="goToStep(0)"></el-step>
        <el-step title="步骤二" description="需求分析" @click="goToStep(1)"></el-step>
        <el-step title="步骤三" description="规划制定" @click="goToStep(2)"></el-step>
      </el-steps>
      <div class="step-content">
        <router-view />
      </div>
    </div>
    <div class="footer">
      <div class="footer-left">
        <!-- 左侧操作区域 -->
      </div>
      <div class="footer-right">
        <el-button v-if="activeStep > 0" @click="prevStep">上一步</el-button>
        <el-button v-if="activeStep < 2" type="primary" @click="nextStep">下一步</el-button>
        <el-button v-if="activeStep === 2" type="success">完成</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeStep = ref(0)

const stepRoutes = ['step1', 'step2', 'step3']

// 根据当前路由设置activeStep
const updateActiveStep = () => {
  const currentPath = route.path.split('/').pop()
  const index = stepRoutes.indexOf(currentPath || '')
  if (index !== -1) {
    activeStep.value = index
  }
}

watch(() => route.path, updateActiveStep, { immediate: true })

const goToStep = (step: number) => {
  router.push(`/product-planning/${stepRoutes[step]}`)
}

const nextStep = () => {
  if (activeStep.value < 2) {
    goToStep(activeStep.value + 1)
  }
}

const prevStep = () => {
  if (activeStep.value > 0) {
    goToStep(activeStep.value - 1)
  }
}
</script>

<style scoped>
.product-planning {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}

.main-content {
  flex: 1;
  overflow-y: auto;
}

.step-content {
  margin: 20px 0;
  min-height: 300px;
}

.footer {
  background: white;
  border-top: 1px solid #e4e7ed;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 -40px -20px -40px;
}

.footer-left {
  /* 左侧操作区域 */
}

.footer-right {
  display: flex;
  gap: 10px;
}
</style>