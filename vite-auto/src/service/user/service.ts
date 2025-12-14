import request from '@/utils/request'
import type { UserInfoResponse } from './types'

/**
 * 获取用户信息
 */
export function getUserInfo(): Promise<UserInfoResponse> {
  return request({
    url: '/user/info',
    method: 'get',
  })
}