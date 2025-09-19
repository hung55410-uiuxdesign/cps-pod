# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Next.js 15.5.3** project named **cps-pod** using the modern **App Router** architecture. The project is built with:

- **React 19.1.0** with React DOM
- **TypeScript 5** with strict configuration
- **Tailwind CSS v4** for styling with PostCSS integration
- **Radix UI** for accessible component primitives and themes
- **Storybook 9** for component development and documentation
- **ESLint 9** with Next.js configuration
- **Turbopack** for development and build optimization
- **Geist fonts** (Sans and Mono) for typography

## Key Commands

### Development
```bash
# Start development server with Turbopack (recommended)
npm run dev

# Start Storybook for component development
npm run storybook

# Production build with Turbopack
npm run build

# Build Storybook for production
npm run build-storybook

# Start production server
npm start

# Lint code
npm run lint
```

### Testing and Quality Assurance
```bash
# Type check TypeScript
npx tsc --noEmit

# Fix ESLint issues automatically  
npm run lint -- --fix

# Check specific file with ESLint
npx eslint src/app/page.tsx
```

## Project Architecture

### Directory Structure
```
├── src/
│   ├── app/                     # App Router directory (Next.js 13+)
│   │   ├── (auth)/             # Route group for auth pages
│   │   ├── (dashboard)/        # Route group for dashboard pages
│   │   │   └── dashboard/      # Dashboard page
│   │   ├── api/                # API routes
│   │   │   └── health/         # Health check endpoint
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Home page component
│   │   ├── globals.css         # Global styles with Tailwind
│   │   └── favicon.ico         # Favicon
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.tsx      # Button component
│   │   │   └── index.ts        # UI components exports
│   │   ├── layout/             # Layout components
│   │   │   ├── header.tsx      # Header component
│   │   │   └── navigation.tsx  # Navigation component
│   │   ├── forms/              # Form components
│   │   └── features/           # Feature-specific components
│   └── lib/                    # Shared utilities and logic
│       ├── utils/              # Utility functions
│       │   ├── cn.ts           # className utility
│       │   └── index.ts        # Utils exports
│       ├── hooks/              # Custom React hooks
│       ├── types/              # TypeScript type definitions
│       ├── constants/          # Application constants
│       ├── validations/        # Schema validation
│       ├── api/                # API client utilities
│       │   └── client.ts       # API client class
│       └── index.ts            # Main lib exports
├── public/                     # Static assets
│   ├── images/                 # Image assets
│   ├── icons/                  # SVG icons (moved from root)
│   └── assets/                 # Other static assets
└── [config files]             # Configuration files
```

### Key Architecture Patterns

**App Router Structure**: This project uses Next.js App Router (not Pages Router). All routes are defined in the `src/app/` directory using the file-system based routing:
- `layout.tsx` files define shared UI for route segments
- `page.tsx` files define the unique UI for routes
- Components follow React 19 patterns with TypeScript

**Styling Architecture**: 
- Uses **Tailwind CSS v4** with inline theme configuration in `globals.css`
- **Radix UI** integration for accessible components with Theme provider
- CSS custom properties for theming (`--background`, `--foreground`) 
- Automatic dark mode support via `prefers-scheme`
- Font optimization with `next/font/google` and Geist font family

**Radix UI Integration**:
- **Theme Provider** wraps the entire application in `layout.tsx`
- **Component Primitives** provide accessible, unstyled building blocks
- **Custom UI Components** built on top of Radix primitives in `src/components/ui/`
- **Tailwind CSS** used for styling Radix components

**TypeScript Configuration**:
- Path mapping configured with `@/*` pointing to `./src/*`
- Strict mode enabled for better type safety
- ES2017 target with modern module resolution
- Next.js TypeScript plugin integrated

## Development Workflow

### Adding New Pages
Create new `page.tsx` files in `src/app/` subdirectories:
```bash
# Example: Create about page
mkdir src/app/about
touch src/app/about/page.tsx
```

### Styling Guidelines
- Use Tailwind utility classes for styling
- Custom CSS variables are defined in `globals.css` 
- Dark mode classes work automatically with `dark:` prefix
- Font classes: `font-sans` (Geist), `font-mono` (Geist Mono)

### Asset Management
- Static files go in `public/` directory
- Use `next/image` component for optimized images
- SVG icons are stored in `public/icons/` and referenced via `/icons/filename.svg`

### Using Radix UI Components
- Import components from `@/components/ui` for custom-styled components
- Import directly from `@radix-ui/themes` for theme components
- All components are accessible by default with proper ARIA attributes
- Use `asChild` prop to compose components without wrapper elements
- Combine with Tailwind CSS for custom styling

### Storybook Development
- Run `npm run storybook` to start the component development server
- Access Storybook at `http://localhost:6006`
- All UI components have corresponding `.stories.tsx` files
- Stories include interactive controls for testing component props
- Built-in accessibility testing with `@storybook/addon-a11y`
- Visual testing capabilities with Chromatic integration

### Folder Organization

**Components Architecture**:
- `components/ui/` - Reusable, generic UI components (Button, Input, Card)
- `components/layout/` - Layout-specific components (Header, Footer, Navigation)
- `components/forms/` - Form-related components and validation
- `components/features/` - Business logic components that combine UI elements

**Lib Structure**:
- `lib/utils/` - Pure utility functions (formatting, calculations)
- `lib/hooks/` - Custom React hooks for shared logic
- `lib/types/` - TypeScript interfaces and type definitions
- `lib/constants/` - Application constants and configuration values
- `lib/api/` - API client and request/response handling
- `lib/validations/` - Schema validation (future: Zod/Yup integration)

**App Router Organization**:
- Route groups `(auth)` and `(dashboard)` organize pages without affecting URLs
- API routes in `app/api/` follow RESTful conventions
- Page components use proper metadata exports for SEO

### Configuration Files
- **next.config.ts**: Next.js configuration (currently minimal)
- **tsconfig.json**: TypeScript compiler options with path mapping
- **eslint.config.mjs**: Modern ESLint flat config with Next.js rules
- **postcss.config.mjs**: PostCSS configuration for Tailwind v4
- **commitlint.config.js**: Conventional commit message validation

## Performance Optimizations

- **Turbopack**: Enabled for both dev and build (faster than Webpack)
- **Font Optimization**: Automatic font loading with `next/font`
- **Image Optimization**: Built-in with `next/image` component
- **CSS Optimization**: Tailwind CSS with PostCSS processing

## Code Quality

### TypeScript Best Practices
- Use `Readonly<>` for props that shouldn't be mutated
- Leverage `Metadata` type for SEO configuration
- Use proper typing for React components and props

### ESLint Configuration
- Extends `next/core-web-vitals` and `next/typescript`
- Ignores build outputs, dependencies, and generated files
- Run automatically in development or manually with `npm run lint`

## Git Hooks (Husky)

The project uses **Husky** for Git hooks to ensure code quality:

### Pre-commit Hook
Runs automatically before each commit:
```bash
# Lint all files
npm run lint

# Type check TypeScript
npx tsc --noEmit
```

### Commit Message Hook
Enforces **Conventional Commits** format:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `style: formatting changes`
- `refactor: code refactoring`
- `test: add or update tests`
- `chore: maintenance tasks`
