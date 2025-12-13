import type { User } from '@/stores/user'

import request from '@/utils/request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  code: number
  message: string
  data: {
    user: User
    token: string
  }
}

export interface DashboardData {
  userCount: number
  orderCount: number
  salesAmount: number
  activeUsers: number
  activities: Array<{
    timestamp: string
    content: string
  }>
}

export interface DashboardResponse {
  code: number
  message: string
  data: DashboardData
}

/**
 * 用户登录
 */
export function login(params: LoginParams): Promise<LoginResponse> {
  return request({
    url: '/auth/login',
    method: 'post',
    data: params,
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo(): Promise<{ code: number; message: string; data: User }> {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

/**
 * 获取仪表板数据
 */
export function getDashboardData(): Promise<DashboardResponse> {
  return request({
    url: '/dashboard/stats',
    method: 'get',
  })
}
