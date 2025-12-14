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