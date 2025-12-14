import type { User } from '@/stores/user'

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