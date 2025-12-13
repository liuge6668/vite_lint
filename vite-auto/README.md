# Vite Auto Vue3 TypeScript Project

A modern Vue 3 + TypeScript project built with Vite, featuring comprehensive tooling for development.

## Features

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **ESLint** for code linting
- **Stylelint** for CSS linting
- **Prettier** for code formatting
- **Husky** + **lint-staged** for Git pre-commit hooks
- **Commitlint** for standardized commit messages
- **Vitest** for unit testing with Vue Test Utils
- **Pinia** for state management
- **Vue Router** for routing
- **Element Plus** UI components
- **Axios** with request/response interceptors
- **Mock.js** for local API mocking
- **VSCode** auto-format on save

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn or pnpm

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and visit `http://localhost:5173`

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

## Project Structure

```
src/
├── main.ts          # Application entry point
├── App.vue          # Root component
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
├── views/           # Page components
├── utils/           # Utility functions
├── mock/            # Mock data
└── vite-env.d.ts    # Vite type definitions
```

## Technologies Used

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Axios](https://axios-http.com/)
- [Mock.js](https://mockjs.com/)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)
- [Prettier](https://prettier.io/)
