import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/dashboard/stats',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          userCount: 1234,
          orderCount: 5678,
          salesAmount: 98765,
          activeUsers: 432,
          activities: [
            {
              timestamp: '2023-10-01 10:00',
              content: '用户张三登录系统',
            },
            {
              timestamp: '2023-10-01 09:30',
              content: '新订单创建 #12345',
            },
            {
              timestamp: '2023-10-01 09:00',
              content: '系统备份完成',
            },
          ],
        },
      }
    },
  },
] as MockMethod[]
