<template>
  <div class="profile">
    <h1>个人资料</h1>
    <div class="profile-container">
      <!-- 基本信息卡片 -->
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <el-icon><User /></el-icon>
            <span>基本信息</span>
          </div>
        </template>

        <div class="profile-info">
          <div class="avatar-section">
            <el-avatar :size="120">
              {{ userStore.user?.name?.charAt(0)?.toUpperCase() }}
            </el-avatar>
            <div class="avatar-actions">
              <el-button type="primary" size="small" @click="changeAvatar">
                <el-icon><Camera /></el-icon>
                更换头像
              </el-button>
            </div>
          </div>

          <div class="info-section">
            <div class="info-item">
              <label>用户名：</label>
              <span>{{ userStore.user?.name }}</span>
            </div>
            <div class="info-item">
              <label>邮箱：</label>
              <span>{{ userStore.user?.email }}</span>
            </div>
            <div class="info-item">
              <label>角色：</label>
              <el-tag :type="userStore.user?.role === 'admin' ? 'danger' : 'primary'">
                {{ userStore.user?.role === 'admin' ? '管理员' : '普通用户' }}
              </el-tag>
            </div>
            <div class="info-item">
              <label>注册时间：</label>
              <span>{{ formatDate('2024-01-01T00:00:00Z') }}</span>
            </div>
            <div class="info-item">
              <label>最后登录：</label>
              <span>{{ formatDate(new Date().toISOString()) }}</span>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 账户安全卡片 -->
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <el-icon><Lock /></el-icon>
            <span>账户安全</span>
          </div>
        </template>

        <div class="security-section">
          <div class="security-item">
            <div class="security-info">
              <div class="security-title">登录密码</div>
              <div class="security-desc">定期更换密码可以保护账户安全</div>
            </div>
            <el-button type="primary" @click="changePassword">修改密码</el-button>
          </div>

          <el-divider />

          <div class="security-item">
            <div class="security-info">
              <div class="security-title">两步验证</div>
              <div class="security-desc">启用两步验证可以进一步保护账户</div>
            </div>
            <el-switch v-model="twoFactorEnabled" @change="toggleTwoFactor" />
          </div>
        </div>
      </el-card>

      <!-- 偏好设置卡片 -->
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <el-icon><Setting /></el-icon>
            <span>偏好设置</span>
          </div>
        </template>

        <div class="preference-section">
          <div class="preference-item">
            <div class="preference-info">
              <div class="preference-title">邮件通知</div>
              <div class="preference-desc">接收系统邮件通知</div>
            </div>
            <el-switch v-model="emailNotification" />
          </div>

          <el-divider />

          <div class="preference-item">
            <div class="preference-info">
              <div class="preference-title">语言设置</div>
              <div class="preference-desc">选择界面语言</div>
            </div>
            <el-select v-model="language" placeholder="选择语言" style="width: 120px">
              <el-option label="中文" value="zh-CN" />
              <el-option label="English" value="en-US" />
            </el-select>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Lock, Setting, Camera } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'

import { useUserStore } from '@/stores/user'

// 模拟用户扩展信息
const userStore = useUserStore()

// 偏好设置状态
const twoFactorEnabled = ref(false)
const emailNotification = ref(true)
const language = ref('zh-CN')

const formatDate = (dateString?: string) => {
  if (!dateString) return '未知'
  return new Date(dateString).toLocaleString('zh-CN')
}

const changeAvatar = () => {
  ElMessage.info('头像更换功能开发中...')
}

const changePassword = () => {
  ElMessageBox.prompt('请输入新密码', '修改密码', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.{6,}$/,
    inputErrorMessage: '密码长度至少6位',
  })
    .then(() => {
      // 这里应该调用API修改密码
      ElMessage.success('密码修改成功')
    })
    .catch(() => {
      ElMessage.info('取消修改')
    })
}

const toggleTwoFactor = (value: boolean) => {
  if (value) {
    ElMessage.success('两步验证已启用')
  } else {
    ElMessage.warning('两步验证已关闭')
  }
}
</script>

<style scoped>
.profile {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-card {
  width: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.profile-info {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.avatar-actions {
  display: flex;
  gap: 8px;
}

.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 32px;
}

.info-item label {
  font-weight: 500;
  color: var(--text-secondary);
  min-width: 80px;
}

.security-section,
.preference-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.security-item,
.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.security-info,
.preference-info {
  flex: 1;
}

.security-title,
.preference-title {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.security-desc,
.preference-desc {
  font-size: 14px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-item {
    flex-direction: column;
    gap: 4px;
  }

  .info-item label {
    min-width: auto;
  }

  .security-item,
  .preference-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
