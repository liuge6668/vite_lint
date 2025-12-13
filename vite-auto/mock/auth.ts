import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }: any) => {
      const { username, password } = body

      // 模拟登录验证
      if (password !== '123456') {
        return {
          code: 400,
          message: '密码错误',
        }
      }

      const user = {
        id: 1,
        name: username,
        email: `${username}@example.com`,
        role: username === 'admin' ? 'admin' : 'user',
      }

      return {
        code: 200,
        message: '登录成功',
        data: {
          user,
          token: 'mock-token-' + Date.now(),
        },
      }
    },
  },
] as MockMethod[]
