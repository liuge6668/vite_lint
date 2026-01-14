# V3 Admin Vite 项目构建指南

本文档详细介绍如何从零开始一步步构建这个基于 Vue 3 + Vite 的后台管理系统模板项目。每个步骤都包含完整的依赖安装列表、详细的配置文件内容和配置说明，以及实际的使用示例。

## 项目概述

这是一个现代化的后台管理系统前端模板，采用 Vue 3 + TypeScript + Vite 技术栈，集成了 Element Plus UI 组件库、Vue Router 路由管理、Pinia 状态管理、UnoCSS 原子化 CSS、自动导入等高级功能。

## 步骤 1: 基础项目搭建 (Vue 3 + Vite)

### 功能介绍
创建最基础的 Vue 3 项目结构，使用 Vite 作为构建工具，提供快速的热重载和优化的生产构建。

### 安装依赖
```bash
# 创建基础 Vue 3 + Vite 项目
npm create vue@latest v3-admin-vite
cd v3-admin-vite

# 安装基础依赖
npm install vue@latest @vitejs/plugin-vue@latest vite@latest

# 安装开发依赖
npm install -D @types/node typescript vue-tsc
```

### 项目结构
```
v3-admin-vite/
├── index.html          # HTML 入口文件
├── package.json        # 项目配置和依赖
├── vite.config.ts      # Vite 配置文件
├── tsconfig.json       # TypeScript 配置文件
└── src/
    ├── main.ts         # 应用入口文件
    ├── App.vue         # 根组件
    └── ...
```

### 关键配置文件

**index.html** (HTML 入口文件):
```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.ico" />
    <title>V3 Admin Vite</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

**vite.config.ts** (Vite 基础配置):
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})
```

**tsconfig.json** (TypeScript 配置):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**src/main.ts** (应用入口):
```typescript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

### 使用方法
```bash
npm run dev      # 启动开发服务器 (默认 http://localhost:3000)
npm run build    # 构建生产版本
npm run preview  # 预览生产构建结果
```

## 步骤 2: 添加 TypeScript 支持

### 功能介绍
为项目添加完整的 TypeScript 支持，包括类型检查、路径别名配置等。

### 安装依赖
```bash
npm install -D typescript vue-tsc @types/node
```

### 配置文件修改

**tsconfig.json** (完整配置):
```json
{
  "compilerOptions": {
    "target": "esnext",
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "lib": ["esnext", "dom"],
    "useDefineForClassFields": true,
    "experimentalDecorators": true,
    "baseUrl": ".",
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["src/*"],
      "@@/*": ["src/common/*"]
    },
    "resolveJsonModule": true,
    "types": ["vite/client", "element-plus/global", "jest"],
    "allowImportingTsExtensions": true,
    "allowJs": true,
    "strict": true,
    "importHelpers": true,
    "noEmit": true,
    "sourceMap": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "skipLibCheck": true
  },
  "include": ["**/*.ts", "**/*.tsx", "**/*.vue", "**/*.d.ts"],
  "exclude": ["node_modules", "dist"]
}
```

**vite.config.ts** (添加路径别名):
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname, 'src/common')
    }
  }
})
```

### 使用方法
```typescript
// 使用路径别名
import { ref } from 'vue'
import MyComponent from '@/components/MyComponent.vue'
import { validateEmail } from '@@/utils/validate'
```

## 步骤 3: 集成 Element Plus UI 组件库

### 功能介绍
集成 Element Plus 组件库，提供丰富的 UI 组件，并配置自动导入和中文语言包。

### 安装依赖
```bash
npm install element-plus @element-plus/icons-vue
npm install -D unplugin-vue-components unplugin-auto-import @element-plus/icons-vue
```

### 配置文件修改

**vite.config.ts** (添加自动导入配置):
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'types/auto/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: 'types/auto/components.d.ts',
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname, 'src/common')
    }
  }
})
```

**src/main.ts** (注册 Element Plus):
```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
```

### 使用方法
```vue
<template>
  <!-- 组件会自动导入 -->
  <el-button type="primary" @click="handleClick">
    <el-icon><Plus /></el-icon>
    添加
  </el-button>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
  </el-table>
</template>

<script setup lang="ts">
// 组合式 API 函数会自动导入
const count = ref(0)
const handleClick = () => {
  count.value++
}
</script>
```

## 步骤 4: 设置 Vue Router 路由管理

### 功能介绍
配置 Vue Router 4，支持路由懒加载、路由守卫、动态路由等功能。

### 安装依赖
```bash
npm install vue-router@4
```

### 配置文件修改

**src/router/index.ts**:
```typescript
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About/index.vue'),
    meta: { title: '关于' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
    meta: { title: '404' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - V3 Admin`
  next()
})

export default router
```

**src/main.ts** (注册路由):
```typescript
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### 使用方法
```vue
<template>
  <div>
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goToAbout = () => {
  router.push('/about')
}
</script>
```

## 步骤 5: 添加 Pinia 状态管理

### 功能介绍
集成 Pinia 作为状态管理解决方案，支持 TypeScript 类型推断。

### 安装依赖
```bash
npm install pinia
```

### 配置文件修改

**src/stores/index.ts**:
```typescript
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
```

**src/stores/user.ts** (示例 store):
```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    id: 0,
    name: '',
    email: ''
  })

  const isLoggedIn = computed(() => !!userInfo.value.id)

  const setUserInfo = (info: typeof userInfo.value) => {
    userInfo.value = info
  }

  const logout = () => {
    userInfo.value = { id: 0, name: '', email: '' }
  }

  return {
    userInfo,
    isLoggedIn,
    setUserInfo,
    logout
  }
})
```

**src/main.ts** (注册 Pinia):
```typescript
import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'

const app = createApp(App)
app.use(pinia)
app.mount('#app')
```

### 使用方法
```vue
<template>
  <div>
    <p v-if="userStore.isLoggedIn">
      欢迎, {{ userStore.userInfo.name }}
    </p>
    <button @click="login">登录</button>
    <button @click="userStore.logout">登出</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const login = () => {
  userStore.setUserInfo({
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com'
  })
}
</script>
```

## 步骤 6: 配置代码质量工具 (ESLint + Prettier + Stylelint)

### 功能介绍
配置完整的代码质量工具链，包括 ESLint 代码检查、Prettier 代码格式化、Stylelint 样式检查。

### 安装依赖
```bash
npm install -D @antfu/eslint-config eslint prettier
npm install -D stylelint stylelint-config-standard stylelint-config-recommended-vue stylelint-order
npm install -D lint-staged husky
```

### 配置文件修改

**eslint.config.js**:
```javascript
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: false
    },
    ignores: []
  },
  {
    rules: {
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/attributes-order': 'off',
      'ts/no-use-before-define': 'off',
      'node/prefer-global/process': 'off',
      'style/comma-dangle': ['error', 'never'],
      'style/brace-style': ['error', '1tbs'],
      'regexp/no-unused-capturing-group': 'off',
      'no-console': 'off',
      'no-debugger': 'off',
      'symbol-description': 'off',
      'antfu/if-newline': 'off',
      'unicorn/no-instanceof-builtins': 'off'
    }
  }
)
```

**.prettierrc**:
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100
}
```

**.stylelintrc.json**:
```json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue"
  ],
  "plugins": ["stylelint-order"],
  "rules": {
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "justify-content",
      "align-items",
      "width",
      "height",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "background",
      "border",
      "border-radius",
      "color",
      "font",
      "font-size",
      "font-weight",
      "text-align",
      "text-decoration",
      "opacity",
      "transform",
      "transition",
      "animation"
    ]
  }
}
```

**package.json** (添加脚本):
```json
{
  "scripts": {
    "lint": "eslint . --fix",
    "lint:style": "stylelint \"**/*.{vue,css,scss,sass,less}\" --fix",
    "format": "prettier --write .",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*": "eslint --fix",
    "*.{js,ts,vue,json,md}": "prettier --write",
    "*.{vue,css,scss,sass,less}": "stylelint --fix"
  }
}
```

### 使用方法
```bash
npm run lint         # 运行 ESLint 检查并修复
npm run lint:style   # 运行 Stylelint 检查并修复
npm run format       # 格式化代码
```

## 步骤 7: 添加测试环境 (Vitest)

### 功能介绍
配置 Vitest 作为测试框架，Vite 原生测试框架，兼容 Jest API，支持组件测试和单元测试。

### 安装依赖
```bash
npm install -D vitest @vue/test-utils happy-dom
```

### 配置文件修改

**vite.config.ts** (添加 Vitest 配置):
```typescript
/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    include: ['tests/**/*.test.{ts,js}'],
    environment: 'happy-dom',
    server: {
      deps: {
        inline: ['element-plus']
      }
    }
  }
})
```

**tests/setup.ts**:
```typescript
// Setup for Vitest tests
console.log('Vitest test setup initialized')
```

### 使用方法
```bash
npm run test  # 运行 Vitest 测试
```

## 步骤 8: 配置 UnoCSS 原子化 CSS

### 功能介绍
集成 UnoCSS 提供原子化 CSS 解决方案，支持按需生成样式。

### 安装依赖
```bash
npm install -D unocss
```

### 配置文件修改

**uno.config.ts**:
```typescript
import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    'btn': 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600',
    'card': 'p-4 bg-white rounded shadow'
  },
  theme: {
    colors: {
      primary: '#409eff'
    }
  }
})
```

**vite.config.ts** (添加 UnoCSS 插件):
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS()
  ]
})
```

**src/main.ts** (导入 UnoCSS):
```typescript
import 'virtual:uno.css'
```

### 使用方法
```vue
<template>
  <div class="card">
    <button class="btn">按钮</button>
    <p class="text-lg text-primary">原子化 CSS 示例</p>
  </div>
</template>
```

## 步骤 9: 配置高级构建功能

### 功能介绍
配置环境变量、多环境构建、代码分割、压缩优化等高级构建功能。

### 安装依赖
```bash
npm install -D vite-svg-loader vite-plugin-vue-mcp
```

### 配置文件修改

**vite.config.ts** (完整配置):
```typescript
/// <reference types="vitest/config" />

import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import SvgComponent from 'unplugin-svg-component/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { VueMcp } from 'vite-plugin-vue-mcp'
import svgLoader from 'vite-svg-loader'

export default defineConfig(({ mode }) => {
  const { VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd(), '') as ImportMetaEnv
  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@@': resolve(__dirname, 'src/common')
      }
    },
    server: {
      host: true,
      port: 3333,
      strictPort: false,
      open: true,
      proxy: {
        '/api/v1': {
          target: 'https://apifoxmock.com/m1/2930465-2145633-default',
          ws: false,
          changeOrigin: true
        }
      },
      cors: true,
      warmup: {
        clientFiles: ['./src/layouts/**/*.*', './src/pinia/**/*.*', './src/router/**/*.*']
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            element: ['element-plus', '@element-plus/icons-vue'],
            vxe: ['vxe-table']
          }
        }
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2048
    },
    esbuild:
      mode === 'development'
        ? undefined
        : {
            pure: ['console.log'],
            drop: ['debugger'],
            legalComments: 'none'
          },
    optimizeDeps: {
      include: ['element-plus/es/components/*/style/css']
    },
    css: {
      preprocessorMaxWorkers: true
    },
    plugins: [
      vue(),
      svgLoader({
        defaultImport: 'url',
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            }
          ]
        }
      }),
      SvgComponent({
        iconDir: [resolve(__dirname, 'src/common/assets/icons')],
        preserveColor: resolve(__dirname, 'src/common/assets/icons/preserve-color'),
        dts: true,
        dtsDir: resolve(__dirname, 'types/auto')
      }),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'types/auto/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dts: 'types/auto/components.d.ts',
        resolvers: [ElementPlusResolver()]
      }),
      VueMcp()
    ],
    test: {
      include: ['tests/**/*.test.{ts,js}'],
      environment: 'happy-dom',
      server: {
        deps: {
          inline: ['element-plus']
        }
      }
    }
  }
})
```

**.env** (环境变量):
```
VITE_APP_TITLE=V3 Admin Vite
VITE_PUBLIC_PATH=/
```

**.env.development**:
```
VITE_APP_TITLE=V3 Admin Vite (开发)
VITE_PUBLIC_PATH=/
```

**.env.production**:
```
VITE_APP_TITLE=V3 Admin Vite
VITE_PUBLIC_PATH=./
```

### 使用方法
```bash
npm run build              # 生产环境构建
npm run build:staging      # 预发布环境构建
```

## 总结

通过以上详细步骤，我们构建了一个功能完整的 Vue 3 后台管理系统模板。每个配置文件都提供了完整的内容和说明，可以直接复制使用。项目采用了现代化的开发工具链，确保了代码质量和开发效率。