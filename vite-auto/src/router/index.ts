import { createRouter, createWebHistory, RouterView } from 'vue-router'
import { defineComponent } from 'vue'

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      layout: false, // 不使用layout
    },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      requiresAuth: true,
      title: '首页',
      icon: 'HomeFilled',
      // menu 默认为 true，显示在菜单中
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About/index.vue'),
    meta: {
      requiresAuth: true,
      title: '关于',
      icon: 'InfoFilled',
      // menu 默认为 true，显示在菜单中
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/index.vue'),
    meta: {
      requiresAuth: true,
      title: '仪表板',
      icon: 'DataLine',
      roles: ['admin'], // 只有admin用户可见
      // menu 默认为 true，显示在菜单中
    },
  },
  {
    path: '/product-planning',
    name: 'ProductPlanning',
    component: () => import('@/views/ProductPlanning/index.vue'),
    meta: {
      requiresAuth: true,
      title: '产品规划',
      icon: 'EditPen',
    },
    children: [
      {
        path: 'step1',
        name: 'ProductPlanningStep1',
        component: () => import('@/views/ProductPlanning/Step1.vue'),
        meta: {
          title: '步骤一：市场调研',
        },
      },
      {
        path: 'step2',
        name: 'ProductPlanningStep2',
        component: () => import('@/views/ProductPlanning/Step2.vue'),
        meta: {
          title: '步骤二：需求分析',
        },
      },
      {
        path: 'step3',
        name: 'ProductPlanningStep3',
        component: () => import('@/views/ProductPlanning/Step3.vue'),
        meta: {
          title: '步骤三：规划制定',
        },
      },
      {
        path: '',
        redirect: '/product-planning/step1',
      },
    ],
  },
  {
    path: '/components-showcase',
    name: 'ComponentsShowcase',
    component: defineComponent({
      render() {
        return h(RouterView)
      }
    }),
    redirect: '/components-showcase/button',
    meta: {
      requiresAuth: true,
      title: '组件展示',
      icon: 'Grid',
    },
    children: [
      {
        path: 'button',
        name: 'ButtonShowcase',
        component: () => import('@/views/ComponentsShowcase/Button.vue'),
        meta: {
          title: 'Button 按钮',
        },
      },
      {
        path: 'input',
        name: 'InputShowcase',
        component: () => import('@/views/ComponentsShowcase/Input.vue'),
        meta: {
          title: 'Input 输入框',
        },
      },
      {
        path: 'table',
        name: 'TableShowcase',
        component: () => import('@/views/ComponentsShowcase/Table.vue'),
        meta: {
          title: 'Table 表格',
        },
      },
      {
        path: 'dialog',
        name: 'DialogShowcase',
        component: () => import('@/views/ComponentsShowcase/Dialog.vue'),
        meta: {
          title: 'Dialog 对话框',
        },
      },
      {
        path: 'select',
        name: 'SelectShowcase',
        component: () => import('@/views/ComponentsShowcase/Select.vue'),
        meta: {
          title: 'Select 选择器',
        },
      },
      {
        path: 'switch',
        name: 'SwitchShowcase',
        component: () => import('@/views/ComponentsShowcase/Switch.vue'),
        meta: {
          title: 'Switch 开关',
        },
      },
    ],
  },
  {
    path: '/tools',
    name: 'Tools',
    component: defineComponent({
      render() {
        return h(RouterView)
      }
    }),
    redirect: '/tools/calculator',
    meta: {
      requiresAuth: true,
      title: '工具',
      icon: 'Tools',
    },
    children: [
      {
        path: 'calculator',
        name: 'Calculator',
        component: () => import('@/views/Calculator.vue'),
        meta: {
          title: '计算器',
          icon: 'Plus',
        },
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: () => import('@/views/Calendar.vue'),
        meta: {
          title: '日历',
          icon: 'Calendar',
        },
      },
    ],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true,
      title: '个人资料',
      icon: 'User',
      menu: false, // 不显示在菜单中，但显示在layout中
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: {
      layout: false,
      hidden: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 检查是否需要登录
  if (to.meta?.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && userStore.isLoggedIn) {
    // 已登录用户访问登录页，跳转到首页
    next('/')
  } else if (to.meta?.roles && userStore.isLoggedIn) {
    // 检查角色权限
    const allowedRoles = to.meta.roles as string[]
    if (!allowedRoles.includes(userStore.user!.role)) {
      // 无权限访问，跳转到首页或显示错误页面
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

// 动态导入useUserStore以避免循环依赖
import { useUserStore } from '@/stores/user'
import { h } from 'vue'

export default router