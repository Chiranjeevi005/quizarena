import { NavigationItem } from "./NavigationRegistry";

export class PermissionResolver {
  static resolve(items: NavigationItem[], userPermissions: string[]): NavigationItem[] {
    return items.filter((item) => {
      if (!item.permission) return true;
      return userPermissions.includes(item.permission);
    });
  }
}
