import { Layer } from "../config/architecture.types";
import * as path from "path";

export class LayerResolver {
  static resolve(relativePath: string, fileName: string): Layer {
    const p = relativePath.toLowerCase();

    if (
      fileName === "page.tsx" ||
      fileName === "page.ts" ||
      fileName === "page.js" ||
      fileName === "page.jsx"
    )
      return Layer.Page;
    if (fileName === "layout.tsx" || fileName === "layout.ts") return Layer.Layout;
    if (fileName === "route.ts" || fileName === "route.tsx") return Layer.Route;
    if (fileName === "loading.tsx" || fileName === "error.tsx" || fileName === "not-found.tsx")
      return Layer.Page;

    if (p.includes("/components/") || fileName.endsWith(".tsx") || fileName.endsWith(".jsx"))
      return Layer.Component;
    if (p.includes("/hooks/") || fileName.startsWith("use")) return Layer.Hook;
    if (p.includes("/store/") || fileName.includes("store")) return Layer.Store;
    if (p.includes("/services/") || fileName.includes("service")) return Layer.Service;
    if (p.includes("/repositories/") || p.includes("/repo/")) return Layer.Repository;
    if (p.includes("/controllers/") || fileName.includes("controller")) return Layer.Controller;
    if (
      p.includes("/validators/") ||
      fileName.includes("validator") ||
      fileName.includes("schema") ||
      p.includes("zod")
    )
      return Layer.Validator;
    if (p.includes("/actions/")) return Layer.Action;
    if (p.includes("/context/") || fileName.includes("context")) return Layer.Context;
    if (p.includes("/providers/") || fileName.includes("provider")) return Layer.Provider;
    if (p.includes("/middleware") || fileName === "middleware.ts") return Layer.Middleware;
    if (
      p.includes("/utils/") ||
      p.includes("/lib/") ||
      fileName.includes("util") ||
      fileName.includes("helper")
    )
      return Layer.Utility;
    if (p.includes("/types/") || fileName.endsWith(".d.ts") || fileName.includes("type"))
      return Layer.Type;
    if (p.includes("/events/") || fileName.includes("event")) return Layer.Event;
    if (p.includes("/commands/") || fileName.includes("command")) return Layer.Command;
    if (
      p.includes("config") ||
      fileName.endsWith("config.ts") ||
      fileName.endsWith("config.mjs") ||
      fileName.endsWith(".json")
    )
      return Layer.Configuration;
    if (p.includes("scripts/") || fileName.endsWith(".sh") || p.includes("/tools/"))
      return Layer.Script;
    if (fileName === "schema.prisma") return Layer.Schema;

    return Layer.Unknown;
  }
}
