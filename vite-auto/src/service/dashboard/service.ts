import request from '@/utils/request'
import type { DashboardResponse } from './types'

/**
 * 获取仪表板数据
 */
export function getDashboardData(): Promise<DashboardResponse> {
  return request({
    url: '/dashboard/stats',
    method: 'get',
  })
}