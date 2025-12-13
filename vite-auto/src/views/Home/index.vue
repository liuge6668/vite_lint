<template>
  <div class="home">
    <h1>Home Page</h1>
    <el-button type="primary" @click="increment">Count: {{ count }}</el-button>
    <el-button @click="fetchUserInfo">Fetch User Info</el-button>
    <div v-if="userInfo">
      <p>User: {{ userInfo.name }}</p>
      <p>Email: {{ userInfo.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { User } from '@/stores/user'

import { useCounterStore } from '@/stores/counter'
import request from '@/utils/request'

const counter = useCounterStore()
const { count, increment } = counter
const userInfo = ref<User | null>(null)

const fetchUserInfo = async () => {
  try {
    const res = await request.get('/user/info')
    userInfo.value = res.data
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
