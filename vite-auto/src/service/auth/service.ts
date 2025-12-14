import request from '@/utils/request'
import type { LoginParams, LoginResponse } from './types'

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