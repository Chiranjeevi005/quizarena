import { NavigationRegistry } from "../../super-admin/registry/NavigationRegistry";
import { CommandRegistry } from "../../super-admin/registry/CommandRegistry";
import { Users, Shield } from "lucide-react";

/**
 * IdentityRegistrar is responsible for plugging the Identity Domain into the SA-01 Shell
 * without modifying the shell itself.
 */
class IdentityRegistrarClass {
  register() {
    console.log("[IdentityRegistrar] Registering Identity Domain capabilities into SA-01 Shell...");

    // Register Navigation
    NavigationRegistry.register({
      id: "identity-users",
      title: "Identity & Access",
      path: "/super-admin/identity",
      icon: Shield,
      category: "core",
      permission: "identity:view",
      priority: 2,
    });

    // Register Commands
    CommandRegistry.register({
      id: "cmd-invite-bulk",
      title: "Bulk Invite SMEs",
      description: "Launch the bulk invitation engine",
      action: () => console.log("Launching Bulk Invite..."),
      category: "People",
      permission: "identity:invite",
      priority: 10,
    });

    CommandRegistry.register({
      id: "cmd-impersonate",
      title: "Impersonate SME",
      description: "Start a read-only impersonation session",
      action: () => console.log("Launching Impersonation Gateway..."),
      category: "Platform",
      permission: "identity:impersonate",
      priority: 100,
      experimental: true,
    });
  }
}

export const IdentityRegistrar = new IdentityRegistrarClass();
