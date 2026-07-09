# QuizArena Frontend Architecture

This document describes the foundational architecture of the QuizArena frontend, implemented in Sprint FS-00.

## 1. Folder Structure

The frontend is structured to mimic a "packages/ui" monorepo setup within a single Next.js app directory. 
- `@/theme` - Design tokens, spacing, colors, and `ThemeProvider`.
- `@/registry` - Global registries for components, providers, and themes to track versions and lifecycle.
- `@/providers` - UI infrastructure providers like Toast, Dialog, Workspace.
- `@/components` - Reusable UI primitives.
- `@/icons` - Icon abstraction layer.
- `@/utilities` - Shared utilities like `cn`.
- `@/types` - Global types shared across architecture boundaries.

## 2. Registries

We use a strict Registry Pattern:
- **ComponentRegistry**: Tracks every UI component (id, name, version, status, storybook ref).
- **ProviderRegistry**: Tracks global providers.
- **ThemeRegistry**: Tracks themes (e.g., light, dark, high-contrast).

All components must register themselves upon declaration to prevent duplication.

## 3. Providers

`AppProvider` is the root composition of all UI providers. 
**Rule**: NEVER include business-domain providers in `@/providers`. Only UI infrastructure (Dialog, Toast, Layout) belongs here.

## 4. Import Rules

- **NO Deep Imports**: Always import from the module index (`import { Button } from '@/components'`).
- **NO Circular Imports**: Modules have a strict dependency graph: `types -> utilities -> registry -> theme -> components -> providers`.
- **NO Hardcoded Values**: Always use tokens from `@/theme`.

## 5. Iconography

All icons must pass through `src/icons/Icon.tsx` and `IconRegistry.ts`. Do not import `lucide-react` directly in component files.

## 6. Developer Playground

A full interactive playground exists at `/dev/ui` to test tokens, components, forms, tables, and charts in complete isolation.
