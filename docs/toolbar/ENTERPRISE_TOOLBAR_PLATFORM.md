# Enterprise Toolbar & Command Platform

**Version:** 1.0.0
**Status:** Frozen

The Enterprise Toolbar Platform provides a presentation-only, registry-driven foundation for all action bars, toolbars, and command palettes across QuizArena workspaces. 

## Architecture

The platform separates state, registry, events, and UI components into a consistent pattern:

- **Manifest & Registry**: Immutable data structures defined in `ToolbarManifest.ts` dictate the capabilities and features available. `ToolbarRegistry.ts` acts as the source of truth for validated configurations.
- **Capabilities**: `ToolbarCapabilities.ts` breaks down functional boolean flags (groups, actions, overflow, commandBar, actionBar, responsive, etc).
- **Context & State**: `ToolbarProvider.tsx` manages a single presentation context tracking `visibleGroups`, `compactMode`, `overflowVisible`, and `orientation`.
- **Events**: `ToolbarEvents.ts` declares purely typed events (`ToolbarActionFocused`, `CommandBarFocused`, etc.) for future Analytics layer consumption.

## Components

All components are strictly presentation-focused, contain zero business execution logic, and register themselves into the `ComponentRegistry`.

- `Toolbar`: Top-level structural container handling layout (Default, Dense, Compact, Floating, Inline).
- `ToolbarGroup`: Visual grouping of actions with support for labels, descriptions, and dividers.
- `ToolbarAction`: An interactive node representing a single action, supporting states like active, selected, disabled, loading, danger, and badges/counters.
- `ActionBar`: A layout container with robust structural slots: Leading, Center, Trailing.
- `CommandBar`: The presentation shell for command palette inputs. It manages idle, focused, loading, disabled, and error visual states, and provides slots for injecting structural overlays like suggestions and results. **It does not execute logic or wire up keyboard shortcuts.**
- `ToolbarOverflow`: A standardized trigger and menu placeholder for overflowed actions, utilizing the `MoreHorizontal` enterprise icon.
- `ToolbarEmptyState`: A semantic, flexible component rendering states like `no-actions`, `loading`, `permission`, and `workspace`.

## Theming & Accessibility

- All UI relies heavily on generic Tailwind layout and Theme Tokens (e.g. `text-primary`, `bg-gray-50`) instead of hardcoded hex values.
- Implements `role="toolbar"` and `aria-orientation` out-of-the-box.
- Built-in visual accessibility for focus management (`focus-visible:ring-2`) and hover indicators.
