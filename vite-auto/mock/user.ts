import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
        },
      }
    },
  },
] as MockMethod[]
