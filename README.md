## Project Overview

StratForge is a SpaceX information web application built with React, TypeScript, Vite, and TanStack Query. The application displays SpaceX rockets, launches, and history using the SpaceX REST API (v4).

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint all files
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Frontend Stack

- **React 19** with TypeScript
- **Vite** as build tool with SWC compiler
- **TanStack Query** for server state management
- **React Router** for routing
- **Tailwind CSS 4** with Headless UI components
- **Framer Motion** for animations

### Project Structure

```
src/
├── api/                    # API layer
│   ├── clients/           # HTTP clients (Axios instance)
│   ├── services/          # Service classes for API calls
│   ├── queryKeys/         # TanStack Query key factories
│   └── types/             # API response types
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── cards/            # Card components
├── hooks/                # Custom React hooks (data fetching)
├── pages/                # Page components
├── routes/               # Routing configuration
├── types/                # TypeScript type definitions
├── lib/                  # Utilities and configuration
│   ├── constants/        # App constants (routes, etc.)
│   ├── utils/           # Utility functions
│   ├── formatters/      # Data formatting utilities
│   └── react-query/     # Query client configuration
├── assets/              # Static assets
└── layout/              # Layout components
```

### Key Patterns

**API Layer Architecture:**

- Service classes handle API calls (`SpaceXRocketService`, `SpaceXLaunchService`, etc.)
- Custom hooks wrap services with TanStack Query (`useAllRockets`, `useLaunches`, etc.)
- Centralized error handling with `logServiceError` utility
- Query key factories for consistent caching

**Type System:**

- Comprehensive TypeScript types for SpaceX API responses
- Service error handling with `ServiceError` type
- Generic `PaginatedResponse<T>` for paginated endpoints

**State Management:**

- TanStack Query for server state with 5-minute stale time
- React Router for client-side routing
- No global state management (Context/Redux) currently used

**Styling:**

- Tailwind CSS 4 with custom `cn()` utility for class merging
- Responsive design patterns
- Component-based styling approach

### SpaceX API Integration

The app integrates with SpaceX API v4 at `https://api.spacexdata.com/v4`:

- Base client configured in `src/api/clients/spacexClient.ts`
- 10-second timeout with request/response logging
- Endpoints: `/rockets`, `/launches`, `/history`
- Supports both REST and query-based endpoints

### Configuration Files

- `tsconfig.json`: Project references setup with separate app/node configs
- `vite.config.ts`: React + Tailwind CSS plugins
- `eslint.config.js`: TypeScript ESLint with React hooks rules
- `netlify.toml`: SPA routing configuration for deployment

## Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow existing naming conventions (PascalCase for components, camelCase for functions)
- Comprehensive JSDoc comments with examples in service classes
- Author attribution in file headers where present

### Data Fetching

- Use existing custom hooks for data fetching
- Follow the service → hook → component pattern
- Implement proper loading/error states
- Leverage TanStack Query's caching capabilities

### Component Development

- Use existing UI components in `src/components/ui/`
- Follow the established card component patterns
- Implement proper TypeScript props interfaces
- Use `cn()` utility for conditional class names
