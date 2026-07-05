export class ImportResolver {
  static isRelative(importPath: string): boolean {
    return importPath.startsWith(".") || importPath.startsWith("..");
  }

  static isExternal(importPath: string): boolean {
    // If it's not relative and doesn't start with an alias (assuming '@/' is our alias),
    // and doesn't match our typical root paths, it's external.
    // However, since we use TS Compiler API, this might be better handled by AliasResolver.
    return !this.isRelative(importPath) && !importPath.startsWith("@/");
  }
}
