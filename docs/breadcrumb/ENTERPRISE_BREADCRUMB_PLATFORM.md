# Enterprise Breadcrumb Platform

**Version:** 1.0.0
**Status:** Frozen

The Enterprise Breadcrumb Platform establishes a unified, presentation-only, registry-driven architecture for all breadcrumb trails across QuizArena workspaces.

## Architecture

The platform separates state, registry, events, and UI components into a consistent pattern:

- **Manifest & Registry**: Immutable data structures defined in `BreadcrumbManifest.ts` dictate the capabilities and features available. `BreadcrumbRegistry.ts` acts as the source of truth for validated implementations.
- **Capabilities**: `BreadcrumbCapabilities.ts` breaks down functional boolean flags (icons, overflow, responsive, accessibility, truncation, compactMode).
- **Context & State**: `BreadcrumbProvider.tsx` manages a single presentation context tracking `visibleItems`, `collapsedItems`, `currentItem`, and `compactMode`—without any reliance on Next.js Router or URL parsing.
- **Events**: `BreadcrumbEvents.ts` declares purely typed events (`BreadcrumbExpanded`, `BreadcrumbItemSelected`, etc.) ready for the future analytics layer.

## Components

All components are strictly presentation-focused and register themselves in the `ComponentRegistry`.

- `Breadcrumb`: Top-level `<nav aria-label="Breadcrumb">` container ensuring proper spacing and wrapping the `<ol>` list.
- `BreadcrumbTrail`: Layout component managing the flex arrangement of items.
- `BreadcrumbItem`: An `<li>` representing an ancestor page. Uses Theme Tokens (`text-secondary` and `text-primary` on hover).
- `BreadcrumbCurrent`: An `<li>` indicating the active page. Automatically receives `aria-current="page"` and enforces a `text-primary` semantic token.
- `BreadcrumbSeparator`: Utility renderer for visual separation between items, supporting chevron, slash, or dot variants.
- `BreadcrumbOverflow`: Utility renderer for collapsed ancestor items, accepting a custom `collapsedRenderer` prop (e.g., `...`, `•••`, `More`).

## Theming & Accessibility

- All colors, sizing, and spacing are driven by Theme Tokens (Tailwind utility classes mapping to semantic intent). No hardcoded colors (`gray`, `navy`) are used in the components themselves.
- `<nav aria-label="Breadcrumb">` is enforced on the top level.
- Structural elements use semantic `<ol>` and `<li>` tags as required by WCAG 2.2 AA.
- `aria-current="page"` is automatically applied to `BreadcrumbCurrent`.
- RTL (`direction: rtl`) is natively supported via CSS Flexbox behaviors in Tailwind.
