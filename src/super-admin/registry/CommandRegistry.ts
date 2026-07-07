import { NavigationRegistry } from "./NavigationRegistry";

export interface Command {
  id: string;
  title: string;
  description?: string;
  action: () => void;
  permission?: string;
}

class CommandRegistryClass {
  private commands: Command[] = [];

  register(command: Command) {
    this.commands.push(command);
  }

  getCommands(userPermissions: string[]): Command[] {
    return this.commands.filter((c) => !c.permission || userPermissions.includes(c.permission));
  }
}

export const CommandRegistry = new CommandRegistryClass();
