import Mock from 'mockjs'

// Mock setup
Mock.setup({
  timeout: '200-600',
})

// Mock data
Mock.mock('/api/user/info', 'get', {
  code: 200,
  message: 'success',
  data: {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  },
})

Mock.mock('/api/list', 'get', {
  code: 200,
  message: 'success',
  'data|10': [
    {
      id: '@id',
      name: '@name',
      email: '@email',
      'age|18-60': 1,
    },
  ],
})

export default Mock
