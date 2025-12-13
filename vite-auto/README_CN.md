# Vite Auto Vue3 TypeScript 管理系统

基于 Vite 构建的现代 Vue 3 + TypeScript 管理系统，具备多种布局模式、主题切换、用户认证和完善的开发工具链。

## ✨ 功能特性

### 🎨 UI & 布局
- **Vue 3** 组合式 API
- **Element Plus** UI 组件库，支持自定义主题
- **多种布局模式**：
  - **经典布局**：侧边栏 + 顶部栏的传统管理后台布局
  - **侧边布局**：全高侧边栏，底部工具栏设计
  - **顶部布局**：水平菜单栏布局，鼠标悬停展开菜单
- **主题切换**：亮色/暗色主题支持
- **响应式设计**：移动端友好的布局适配

### 🔧 开发工具
- **TypeScript** 类型安全
- **Vite** 快速开发和构建
- **ESLint** 代码检查
- **Stylelint** CSS 检查
- **Prettier** 代码格式化
- **Husky** + **lint-staged** Git 提交前钩子
- **Commitlint** 标准化提交信息
- **Vitest** 单元测试

### 🏗️ 架构设计
- **Pinia** 状态管理（用户、主题、布局状态）
- **Vue Router** 路由守卫和基于元信息的权限控制
- **Axios** 请求/响应拦截器和 Token 管理
- **Mock.js** 本地 API 模拟
- **组件化架构** 可复用的组件设计

### 🔐 认证与权限
- **用户认证**：登录/登出，基于 Token 的身份验证
- **角色权限控制**：管理员/普通用户权限区分
- **路由守卫**：根据认证状态自动跳转
- **动态菜单**：基于用户权限过滤菜单项

### 📊 仪表板与数据
- **实时仪表板**：统计数据和活动日志
- **API 集成**：RESTful API 调用和错误处理
- **数据可视化**：图表和指标展示
- **加载状态**：数据获取过程中的用户反馈

## 🚀 快速开始

### 环境要求

- Node.js (16 及以上版本)
- npm 或 yarn 或 pnpm

### 安装步骤

1. **安装依赖**：

    ```bash
    npm install
    ```

2. **启动开发服务器**：

    ```bash
    npm run dev
    ```

3. **打开浏览器访问** `http://localhost:5173`

### 🎯 快速使用指南

#### 用户认证
- **登录方式**：用户名输入 `admin`（管理员角色）或其他任意名称（普通用户角色）
- **密码**：`123456`（演示用统一密码）
- **登出**：点击右上角用户头像下拉菜单

#### 布局模式
- **经典布局**：带有侧边栏和顶部栏的传统管理后台
- **侧边布局**：全高侧边栏设计，工具栏在底部
- **顶部布局**：水平菜单栏，鼠标悬停展开菜单

#### 主题切换
- 点击主题切换按钮（太阳/月亮图标）在亮色和暗色主题间切换
- 设置自动保存到本地存储

#### 页面导航
- **首页**：主要仪表板，包含统计数据
- **关于**：信息展示页面
- **仪表板**：管理员专属页面，包含详细分析数据

## 📁 项目结构

```
src/
├── api/             # API 服务函数
│   └── user.ts      # 用户相关 API 调用
├── components/      # 可复用组件
│   ├── Logo/        # 随机 Logo 组件
│   ├── LayoutToggle/# 布局模式切换器
│   └── ThemeToggle/ # 主题切换器
├── layouts/         # 布局组件
│   └── BasicLayout.vue # 支持多种模式的主体布局
├── router/          # Vue Router 配置
│   └── index.ts     # 带有元信息权限控制的路由
├── stores/          # Pinia 状态管理
│   ├── user.ts      # 用户认证状态
│   ├── theme.ts     # 主题切换状态
│   └── layout.ts    # 布局模式状态
├── utils/           # 工具函数
│   ├── request.ts   # Axios 配置和拦截器
│   └── permission.ts# 权限检查工具
├── views/           # 页面组件
│   ├── Login/       # 认证页面
│   ├── Dashboard/   # 管理仪表板
│   ├── Home/        # 首页
│   ├── About/       # 关于页面
│   └── NotFound/    # 404 页面
├── assets/          # 静态资源
│   └── css/         # 样式文件
├── mock/            # Mock API 数据
├── main.ts          # 应用入口
├── App.vue          # 根组件
└── vite-env.d.ts    # Vite 类型定义
```

## 🔧 核心架构

### 状态管理
- **用户状态**：认证信息、用户信息、权限管理
- **主题状态**：亮色/暗色主题切换逻辑
- **布局状态**：三种布局模式的切换和管理

### 路由与权限
- **路由元信息**：`requiresAuth`、`roles`、`showInMenu`、`hidden`
- **路由守卫**：基于认证状态的自动跳转
- **动态菜单**：根据用户权限过滤显示的菜单项

### API 集成
- **请求拦截器**：自动添加认证 Token
- **响应拦截器**：统一的错误处理机制
- **Mock 数据**：本地开发环境的 API 模拟

### 组件架构
- **布局组件**：响应式的多模式布局系统
- **业务组件**：仪表板、表单、数据展示组件
- **UI 组件**：按钮、切换器、Logo 等可复用组件

## 📝 API 文档

### 用户认证
```typescript
POST /api/auth/login
{
  "username": "admin",
  "password": "123456"
}
```

### 仪表板数据
```typescript
GET /api/dashboard/stats
// 返回用户数量、订单数量、销售金额和活动日志
```

### 用户信息
```typescript
GET /api/user/info
// 返回当前用户信息
```

## 🎨 自定义扩展

### 添加新的布局模式
1. 在 `stores/layout.ts` 中更新 `LayoutType`
2. 在 `layouts/BasicLayout.vue` 中添加布局逻辑
3. 更新 `LayoutToggle` 组件

### 添加新的主题
1. 在 `assets/css/themes.css` 中添加主题变量
2. 更新主题状态逻辑
3. 测试主题切换功能

### 添加新的权限
1. 为路由添加新的角色元信息
2. 修改权限检查逻辑
3. 更新菜单过滤规则

## 🛠️ 技术栈

### 核心框架
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型化 JavaScript
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

### 状态与路由
- [Pinia](https://pinia.vuejs.org/) - 直观的狀態管理
- [Vue Router](https://router.vuejs.org/) - 官方路由库

### UI 与样式
- [Element Plus](https://element-plus.org/) - Vue 3 UI 组件库
- [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) - 动态主题

### HTTP 与 API
- [Axios](https://axios-http.com/) - 带有拦截器的 HTTP 客户端
- [Mock.js](https://mockjs.com/) - 开发环境 API 模拟

### 开发工具
- [ESLint](https://eslint.org/) - 代码检查
- [Stylelint](https://stylelint.io/) - CSS 检查
- [Prettier](https://prettier.io/) - 代码格式化
- [Husky](https://typicode.github.io/husky/) - Git 钩子
- [lint-staged](https://github.com/okonet/lint-staged) - 提交前检查
- [Commitlint](https://commitlint.js.org/) - 提交信息检查
- [Vitest](https://vitest.dev/) - 单元测试框架
- [Vue Test Utils](https://test-utils.vuejs.org/) - Vue 组件测试

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'feat: add your feature'`
4. 推送到分支：`git push origin feature/your-feature`
5. 提交 Pull Request

### 开发规范
- 遵循现有的代码风格
- 为新功能编写测试
- 根据需要更新文档
- 提交前确保所有测试通过

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - Vue 3 UI 组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Ant Design](https://ant.design/) - 设计灵感来源

---

使用 ❤️ 基于 Vue 3 + TypeScript + Vite 构建