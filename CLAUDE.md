# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

NC Domain Finder is a React Native mobile application built with Expo 54 that allows users to search and find available domain names in .nc (New Caledonia) or discover information about registered domains. This is an alternative to the Domaine NC Mobile app with enhanced features and better user experience.

## Development Commands

### Package Manager
- Uses Bun as the package manager (v1.2.0+)
- Install dependencies: `bun install`

### Development & Testing
- Start development server: `npx expo start -c`
- Run Android app: `npx expo run:android --variant release`
- Run iOS app: `expo run:ios`
- Run tests: `jest --watchAll`
- Lint code: `eslint src/ app.config.ts`
- Type check: `tsc --noEmit`

### Build Commands
- Dev Android build: `cross-env NODE_ENV=development APP_ENV=development npx eas-cli build --profile development --platform android`
- Dev iOS build: `cross-env NODE_ENV=development APP_ENV=development npx eas-cli build --profile development --platform ios`
- Dev iOS simulator: `cross-env NODE_ENV=development APP_ENV=development npx eas-cli build --profile development-simulator --platform ios`
- Staging Android: `cross-env NODE_ENV=production APP_ENV=staging npx eas-cli build --profile staging --platform android`
- Production build: `cross-env NODE_ENV=production APP_ENV=production npx eas-cli build --profile production --platform all --auto-submit-with-profile=production`

### Updates & Analysis
- Update staging: `cross-env NODE_ENV=production APP_ENV=staging npx eas-cli update --channel staging --auto`
- Update production: `cross-env NODE_ENV=production APP_ENV=production npx eas-cli update --channel production --auto`
- Analyze iOS bundle: `source-map-explorer 'dist/_expo/static/js/ios/*.js' 'dist/_expo/static/js/ios/*.js.map'`
- Analyze Android bundle: `npx expo export --source-maps --platform android --no-bytecode && source-map-explorer 'dist/_expo/static/js/android/*.js' 'dist/_expo/static/js/android/*.js.map'`

## Architecture

### Tech Stack
- **Framework**: React Native with Expo 54
- **Navigation**: Expo Router (file-based routing)
- **UI Library**: React Native Paper
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query (React Query) with persistence
- **Internationalization**: i18next with react-i18next
- **Database**: Expo SQLite
- **Error Tracking**: Sentry (disabled in development)
- **Styling**: React Native StyleSheet with theming support

### Project Structure
- `src/app/` - Expo Router pages and layouts using file-based routing
- `src/components/` - Reusable UI components including modals, views, and router layouts
- `src/hooks/` - Custom React hooks including queries, stores, and utilities
- `src/config/` - Configuration files for themes, language detection
- `src/helpers/` - Utility functions for date handling, queries, favicon generation
- `src/schemas/` - Zod validation schemas for domain data
- `src/translations/` - i18n translation files (English and French)
- `src/types/` - TypeScript type definitions

### Key Features
- Domain search functionality with caching
- Favorites management with persistent storage
- Multi-language support (English/French)
- Dark/light theme support with system preference detection
- Offline capability with React Query persistence
- In-app updates using Expo Updates
- Error boundary with Sentry integration
- Native tab navigation using `expo-router/unstable-native-tabs` for enhanced performance
- React Compiler enabled for automatic optimization and memoization

### Path Aliases
The project uses TypeScript path aliases configured in both `tsconfig.json` and `babel.config.js`:
- `@components/*` → `src/components/*`
- `@config/*` → `src/config/*`
- `@customTypes/*` → `src/types/*`
- `@helpers/*` → `src/helpers/*`
- `@hooks/*` → `src/hooks/*`

### Environment Configuration
- Three environments: development, staging, production
- Environment-specific app icons and package names
- Uses `cross-env` for cross-platform environment variable handling
- Environment variables configured via `.env` file and processed by `react-native-dotenv`

### Code Style
- ESLint with TypeScript rules, React, and React Hooks plugins
- Strict TypeScript configuration with null checks
- Code formatting rules including semicolons, single quotes, sorted imports/keys
- Uses Unix line endings and 2-space indentation

### State Management Pattern
- Zustand stores for favorites and settings management
- TanStack Query for server state management with automatic caching and persistence
- AsyncStorage persister for offline data access

### Testing
- Jest with jest-expo preset for testing React Native components
- Test files should follow the `*.test.ts` or `*.test.tsx` naming convention

## New Architecture (Enabled)

This project uses React Native's New Architecture for enhanced performance and modern development practices.

### New Architecture Components
- **TurboModules**: Lazy-loaded native modules with direct JSI communication
- **Fabric Renderer**: Synchronous UI rendering system
- **Bridgeless Mode**: Direct C++ communication bypassing the legacy bridge
- **JSI (JavaScript Interface)**: Synchronous JavaScript-to-native communication
- **Codegen**: Type-safe code generation for native modules

### Performance Benefits
- **50% reduction in Time-To-Interactive (TTI)** with bridgeless mode
- **10x faster iOS clean build times** (from ~120s to ~10s) with precompiled XCFrameworks
- **Synchronous native calls** eliminating JSON serialization overhead
- **Lazy loading** of native modules reducing startup time
- **Type-safe native interfaces** with compile-time validation

### New Architecture Configuration
- Enabled globally via `newArchEnabled: true` in app.config.ts
- Platform-specific configuration in expo-build-properties:
  - iOS: `useFrameworks: 'static'` for optimal performance
  - Android: Native configuration automatically applied
- Metro bundler optimized for New Architecture compatibility

### Migration Guidelines
1. **Dependency Compatibility**: All expo-* packages in SDK 54 support New Architecture
2. **Third-party Libraries**: Verify library compatibility or use interop layer
3. **Custom Native Modules**: Migrate to TurboModules for best performance
4. **Testing**: Run prebuild and test on both platforms after enabling

### Development Requirements
- **Node.js**: 22+ LTS (Jod) - Required for optimal performance and latest features
- **Bun**: 1.2.0+ - Package manager with enhanced lockfile compatibility
- **Navigation**: Native tabs with `expo-router/unstable-native-tabs` for optimal performance
- **React Compiler**: Enabled with strict compilation mode for automatic optimization
- **Expo CLI**: Latest version
- **EAS CLI**: For building and deploying

### Development Commands for New Architecture
- Clean and prebuild: `npx expo prebuild --clean`
- Run with New Architecture: `npx expo run:ios` or `npx expo run:android`
- Debug New Architecture: Use Flipper or React DevTools with JSI support

### React Compiler Configuration

React Compiler is enabled with strict compilation mode for automatic optimization and memoization. The configuration is set in `babel.config.js`:

```javascript
presets: [
  [
    'babel-preset-expo',
    {
      jsxRuntime: 'automatic',
      'react-compiler': {
        compilationMode: 'strict'
      }
    }
  ]
]
```

#### Opting Out of React Compiler
You can disable React Compiler for specific components using the "use no memo" directive:

```javascript
function MyComponent() {
  'use no memo';
  // This component will not be optimized by React Compiler
  return <Text>Component content</Text>;
}
```

#### Benefits
- Automatic memoization of expensive calculations
- Reduced re-renders through intelligent dependency tracking
- Better performance without manual `useMemo` and `useCallback` usage

### Troubleshooting
- If builds fail, clean node_modules and run `bun install`
- For iOS issues, delete ios/ folder and run `npx expo prebuild --platform ios`
- For Android issues, delete android/ folder and run `npx expo prebuild --platform android`
- Use `npx react-native info` to verify New Architecture status
- React Compiler logs "Experimental React Compiler is enabled." during development