import { PrimitiveRegistry } from "@/registry";

// Placeholders for future primitives to reserve registry entries

const createPlaceholderComponent = (name: string) => {
  const Component = () => null;
  Component.displayName = name;
  return Component;
};

PrimitiveRegistry.register({
  id: "primitive-chip",
  name: "Chip",
  version: "0.0.0-placeholder",
  registryVersion: "1.0.0",
  status: "experimental",
  category: "primitives",
  description: "Compact interactive element for selections and filtering (Placeholder).",
  dependencies: [],
  tokens: [],
  accessibility: [],
  responsive: true,
  motion: ["none"],
  component: createPlaceholderComponent("Chip"),
});

PrimitiveRegistry.register({
  id: "primitive-pill",
  name: "Pill",
  version: "0.0.0-placeholder",
  registryVersion: "1.0.0",
  status: "experimental",
  category: "primitives",
  description: "Fully rounded static or interactive visual element (Placeholder).",
  dependencies: [],
  tokens: [],
  accessibility: [],
  responsive: true,
  motion: ["none"],
  component: createPlaceholderComponent("Pill"),
});

PrimitiveRegistry.register({
  id: "primitive-statusdot",
  name: "StatusDot",
  version: "0.0.0-placeholder",
  registryVersion: "1.0.0",
  status: "experimental",
  category: "primitives",
  description: "Minimal status indicator (Placeholder).",
  dependencies: [],
  tokens: [],
  accessibility: [],
  responsive: true,
  motion: ["none"],
  component: createPlaceholderComponent("StatusDot"),
});

PrimitiveRegistry.register({
  id: "primitive-kbd",
  name: "Kbd",
  version: "0.0.0-placeholder",
  registryVersion: "1.0.0",
  status: "experimental",
  category: "primitives",
  description: "Keyboard shortcut visualizer (Placeholder).",
  dependencies: [],
  tokens: [],
  accessibility: [],
  responsive: true,
  motion: ["none"],
  component: createPlaceholderComponent("Kbd"),
});

PrimitiveRegistry.register({
  id: "primitive-surface",
  name: "Surface",
  version: "0.0.0-placeholder",
  registryVersion: "1.0.0",
  status: "experimental",
  category: "primitives",
  description: "Base layer primitive for elevated content (Placeholder).",
  dependencies: [],
  tokens: [],
  accessibility: [],
  responsive: true,
  motion: ["none"],
  component: createPlaceholderComponent("Surface"),
});

PrimitiveRegistry.register({
  id: "primitive-scrollarea",
  name: "ScrollArea",
  version: "0.0.0-placeholder",
  registryVersion: "1.0.0",
  status: "experimental",
  category: "primitives",
  description: "Custom scrollbar container for precise layout control (Placeholder).",
  dependencies: ["@radix-ui/react-scroll-area"],
  tokens: [],
  accessibility: [],
  responsive: true,
  motion: ["none"],
  component: createPlaceholderComponent("ScrollArea"),
});

PrimitiveRegistry.register({
  id: "primitive-aspectratio",
  name: "AspectRatio",
  version: "0.0.0-placeholder",
  registryVersion: "1.0.0",
  status: "experimental",
  category: "primitives",
  description: "Component for maintaining responsive aspect ratios (Placeholder).",
  dependencies: ["@radix-ui/react-aspect-ratio"],
  tokens: [],
  accessibility: [],
  responsive: true,
  motion: ["none"],
  component: createPlaceholderComponent("AspectRatio"),
});
