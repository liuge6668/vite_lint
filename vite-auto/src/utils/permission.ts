import type { RouteRecordRaw } from 'vue-router'

import { useUserStore } from '@/stores/user'

/**
 * 检查用户是否有权限访问路由
 * @param route 路由配置
 * @returns 是否有权限
 */
export function hasPermission(route: RouteRecordRaw): boolean {
  const userStore = useUserStore()

  // 如果路由不需要权限，直接返回true
  if (!route.meta?.roles) {
    return true
  }

  // 如果用户未登录，返回false
  if (!userStore.isLoggedIn || !userStore.user) {
    return false
  }

  // 检查用户角色是否在允许的角色列表中
  const allowedRoles = route.meta.roles as string[]
  return allowedRoles.includes(userStore.user.role)
}

/**
 * 过滤有权限的路由
 * @param routes 路由列表
 * @returns 有权限的路由列表
 */
export function filterRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.filter((route) => {
    if (hasPermission(route)) {
      if (route.children) {
        route.children = filterRoutes(route.children)
      }
      return true
    }
    return false
  })
}

/**
 * 检查用户是否是管理员
 * @returns 是否是管理员
 */
export function isAdmin(): boolean {
  const userStore = useUserStore()
  return userStore.isLoggedIn && userStore.user?.role === 'admin'
}

/**
 * 检查用户是否是普通用户
 * @returns 是否是普通用户
 */
export function isUser(): boolean {
  const userStore = useUserStore()
  return userStore.isLoggedIn && userStore.user?.role === 'user'
}
