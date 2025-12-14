<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="login-title">登录</div>
      </template>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
          <div class="form-tip">
            输入 "admin" 登录管理员账号，输入其他用户名登录普通用户账号<br />
            密码统一为: 123456
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleLogin" style="width: 100%">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import type { FormInstance } from 'element-plus'

import { login } from '@/service/auth/service'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
})

const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const handleLogin = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const response = await login({
          username: loginForm.username,
          password: loginForm.password,
        })
        console.log(response, 'res')
        userStore.login(response.data.user, response.data.token)
        ElMessage.success('登录成功')
        router.push('/')
      } catch (error) {
        // 错误已经在请求拦截器中处理了
        console.error('登录失败:', error)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 400px;
}

.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.form-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}
</style>
