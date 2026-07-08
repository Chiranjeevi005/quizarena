import { NavigationRegistry } from "./NavigationRegistry";

export interface CommandManifest {
  id: string;
  title: string;
  description?: string;
  action: () => void;
  permission?: string;

  // Advanced routing and UI
  shortcut?: string;
  workspace?: string;
  category?:
    | "Navigation"
    | "Competition"
    | "People"
    | "Finance"
    | "Operations"
    | "Platform"
    | "Developer";
  priority?: number;

  // Feature Flags
  hidden?: boolean;
  enabled?: boolean;
  experimental?: boolean;
  deprecated?: boolean;
  comingSoon?: boolean;
}

class CommandRegistryClass {
  private commands: CommandManifest[] = [];

  register(command: CommandManifest) {
    this.commands.push(command);
  }

  getCommands(userPermissions: string[]): CommandManifest[] {
    return this.commands.filter(
      (c) =>
        (!c.permission || userPermissions.includes(c.permission)) &&
        c.enabled !== false &&
        !c.hidden
    );
  }

  getAll(): CommandManifest[] {
    return this.commands;
  }
}

export const CommandRegistry = new CommandRegistryClass();
