# Vite Auto Vue3 TypeScript Admin System

A modern Vue 3 + TypeScript admin system built with Vite, featuring multiple layout modes, theme switching, user authentication, and comprehensive development tooling.

## ✨ Features

### 🎨 UI & Layout
- **Vue 3** with Composition API
- **Element Plus** UI components with custom themes
- **Multiple Layout Modes**:
  - **Mix Layout**: Classic sidebar + header layout
  - **Side Layout**: Full-height sidebar with bottom toolbar (hover menu when collapsed)
  - **Top Layout**: Horizontal menu bar layout
- **Collapsible Sidebar**: Smooth expand/collapse with debouncing and synchronized animations
- **Breadcrumb Navigation**: Auto-generated breadcrumbs based on route hierarchy
- **Theme Switching**: Light/Dark theme support
- **Responsive Design**: Mobile-friendly layouts

### 🔧 Development Tools
- **TypeScript** for type safety
- **Vite** for fast development and building
- **ESLint** for code linting
- **Stylelint** for CSS linting
- **Prettier** for code formatting
- **Husky** + **lint-staged** for Git pre-commit hooks
- **Commitlint** for standardized commit messages
- **Vitest** for unit testing with Vue Test Utils

### 🏗️ Architecture
- **Pinia** for state management (User, Theme, Layout stores)
- **Vue Router** with route guards and meta-based permissions
- **Axios** with request/response interceptors and token management
- **Mock.js** for local API mocking
- **Component-based architecture** with reusable components

### 🔐 Authentication & Authorization
- **User Authentication**: Login/Logout with token-based auth
- **Role-based Access Control**: Admin/User permissions
- **Route Guards**: Automatic redirects based on auth status
- **Menu Filtering**: Dynamic menu based on user permissions

### 📊 Dashboard & Data
- **Real-time Dashboard**: Statistics and activity feeds
- **API Integration**: RESTful API calls with error handling
- **Data Visualization**: Charts and metrics display
- **Loading States**: User feedback during data fetching

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn or pnpm

### Installation

1. **Install dependencies**:

    ```bash
    npm install
    ```

2. **Start the development server**:

    ```bash
    npm run dev
    ```

3. **Open your browser and visit** `http://localhost:5173`

### 🎯 Quick Start Guide

#### User Authentication
- **Login**: Use username `admin` (admin role) or any other name (user role)
- **Password**: `123456` (universal password for demo)
- **Logout**: Click user avatar in top-right corner

#### Layout Modes
- **Mix Layout**: Classic admin layout with sidebar and header
- **Side Layout**: Full-height sidebar with bottom toolbar
- **Top Layout**: Horizontal menu bar (hover to expand)

#### Theme Switching
- Click the theme toggle button (sun/moon icon) to switch between light and dark themes
- Settings are automatically saved to localStorage

#### Navigation
- **Breadcrumb**: Auto-generated navigation showing current location
- **Home**: Main dashboard with statistics
- **About**: Information page
- **Dashboard**: Admin-only page with detailed analytics
- **Tools**: Calculator and Calendar utilities (in sidebar submenu)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:style` - Run Stylelint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

### Git Commit Hooks

This project uses **Husky**, **lint-staged**, and **Commitlint** to ensure code quality and standardized commit messages:

- **Pre-commit hook**: Automatically runs ESLint, Stylelint, and Prettier on staged files
- **Commit-msg hook**: Validates commit message format using conventional commits
- If any checks fail, the commit will be blocked
- Files are automatically fixed where possible

#### Commit Message Format

Please follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

**Examples:**
```bash
feat: add user authentication
fix: resolve memory leak in data processing
docs: update API documentation
```

To bypass the hooks (not recommended), use:
```bash
git commit --no-verify -m "your commit message"
```

## Testing

This project uses **Vitest** for unit testing with **Vue Test Utils** for Vue component testing.

### Test Structure

```
src/
├── test/
│   └── setup.ts          # Global test setup
├── stores/__tests__/     # Store tests
├── utils/__tests__/      # Utility tests
├── views/__tests__/      # Component tests
└── *.test.ts             # Other tests
```

### Writing Tests

- **Unit tests** for utilities, stores, and business logic
- **Component tests** for Vue components using Vue Test Utils
- **Integration tests** for complete user workflows

Example test:
```typescript
import { describe, it, expect } from 'vitest'

describe('My Feature', () => {
  it('should work correctly', () => {
    expect(1 + 1).toBe(2)
  })
})
```

### Test Coverage

Run tests with coverage:
```bash
npm run test:coverage
```

Coverage reports will be generated in the `coverage/` directory.

## 📁 Project Structure

```
src/
├── api/             # API service functions
│   └── user.ts      # User-related API calls
├── components/      # Reusable components
│   ├── Breadcrumb/  # Auto-generated breadcrumb navigation
│   ├── Logo/        # Random logo component
│   ├── LayoutToggle/# Layout mode switcher
│   └── ThemeToggle/ # Theme switcher
├── layouts/         # Layout components
│   └── BasicLayout.vue # Main layout with multiple modes
├── router/          # Vue Router configuration
│   └── index.ts     # Routes with meta-based permissions
├── stores/          # Pinia state management
│   ├── user.ts      # User authentication store
│   ├── theme.ts     # Theme switching store
│   └── layout.ts    # Layout mode store
├── utils/           # Utility functions
│   ├── request.ts   # Axios configuration with interceptors
│   └── permission.ts# Permission checking utilities
├── views/           # Page components
│   ├── Login/       # Authentication page
│   ├── Dashboard/   # Admin dashboard
│   ├── Home/        # Home page
│   ├── About/       # About page
│   └── NotFound/    # 404 page
├── assets/          # Static assets
│   └── css/         # Stylesheets
├── mock/            # Mock API data
├── main.ts          # Application entry point
├── App.vue          # Root component
└── vite-env.d.ts    # Vite type definitions
```

## 🔧 Core Architecture

### State Management
- **User Store**: Authentication, user info, permissions
- **Theme Store**: Light/dark theme switching
- **Layout Store**: Layout mode management (mix/side/top)

### Routing & Permissions
- **Route Meta**: `requiresAuth`, `roles`, `showInMenu`, `hidden`
- **Route Guards**: Automatic redirects based on auth status
- **Dynamic Menus**: Menu items filtered by user permissions

### API Integration
- **Request Interceptors**: Automatic token attachment
- **Response Interceptors**: Unified error handling
- **Mock Data**: Local development API simulation

### Component Architecture
- **Layout Components**: Responsive multi-mode layouts
- **Business Components**: Dashboard, forms, data display
- **UI Components**: Reusable buttons, toggles, logos

## 🛠️ Technologies Used

### Core Framework
- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Vite](https://vitejs.dev/) - Fast build tool and dev server

### State Management & Routing
- [Pinia](https://pinia.vuejs.org/) - Intuitive state management
- [Vue Router](https://router.vuejs.org/) - Official routing library

### UI & Styling
- [Element Plus](https://element-plus.org/) - Vue 3 UI component library
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - Dynamic theming

### HTTP & API
- [Axios](https://axios-http.com/) - HTTP client with interceptors
- [Mock.js](https://mockjs.com/) - API mocking for development

### Development Tools
- [ESLint](https://eslint.org/) - Code linting
- [Stylelint](https://stylelint.io/) - CSS linting
- [Prettier](https://prettier.io/) - Code formatting
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [lint-staged](https://github.com/okonet/lint-staged) - Pre-commit linting
- [Commitlint](https://commitlint.js.org/) - Commit message linting
- [Vitest](https://vitest.dev/) - Unit testing framework
- [Vue Test Utils](https://test-utils.vuejs.org/) - Vue component testing

### Development Experience
- [VSCode](https://code.visualstudio.com/) - Recommended IDE
- [Auto-format on save](https://eslint.org/docs/user-guide/integrations#editors) - Consistent code style
- [Hot Module Replacement](https://vitejs.dev/guide/features.html#hot-module-replacement) - Fast development

## 📝 API Documentation

### Authentication
```typescript
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",    // or any username for user role
  "password": "123456"    // universal demo password
}

// Response
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "user": {
      "id": 1,
      "name": "admin",
      "email": "admin@example.com",
      "role": "admin"  // "admin" or "user"
    },
    "token": "mock-token-1234567890"
  }
}
```

### Dashboard Data
```typescript
GET /api/dashboard/stats
Authorization: Bearer <token>

// Response
{
  "code": 200,
  "message": "success",
  "data": {
    "userCount": 1234,
    "orderCount": 5678,
    "salesAmount": 98765,
    "activeUsers": 432,
    "activities": [
      {
        "timestamp": "2023-10-01 10:00",
        "content": "用户张三登录系统"
      }
    ]
  }
}
```

### User Info
```typescript
GET /api/user/info
Authorization: Bearer <token>

// Response
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

## 🎨 Customization

### Adding New Layout Modes
1. Update `LayoutType` in `stores/layout.ts`
2. Add layout logic in `layouts/BasicLayout.vue`
3. Update `LayoutToggle` component

### Adding New Themes
1. Add theme variables in `assets/css/themes.css`
2. Update theme store logic
3. Test theme switching

### Adding New Permissions
1. Update route meta with new roles
2. Modify permission checking logic
3. Update menu filtering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Element Plus](https://element-plus.org/) - A Vue 3 UI Library
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Ant Design](https://ant.design/) - Design inspiration

---

Built with ❤️ using Vue 3 + TypeScript + Vite
