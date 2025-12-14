import type { User } from '@/stores/user'

export interface UserInfoResponse {
  code: number
  message: string
  data: User
}