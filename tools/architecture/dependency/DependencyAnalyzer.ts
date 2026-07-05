import { Project, SourceFile } from "ts-morph";
import { DependencyMetadata } from "../config/architecture.types";

export class DependencyAnalyzer {
  static analyze(sourceFile: SourceFile): DependencyMetadata {
    const imports = sourceFile.getImportDeclarations();
    const exports = sourceFile.getExportDeclarations();

    const internalImports: string[] = [];
    const externalImports: string[] = [];
    const relativeImports: string[] = [];
    const absoluteImports: string[] = [];

    imports.forEach((imp) => {
      const moduleSpecifier = imp.getModuleSpecifierValue();
      if (moduleSpecifier.startsWith(".") || moduleSpecifier.startsWith("..")) {
        relativeImports.push(moduleSpecifier);
        internalImports.push(moduleSpecifier);
      } else if (moduleSpecifier.startsWith("@/")) {
        absoluteImports.push(moduleSpecifier);
        internalImports.push(moduleSpecifier);
      } else {
        externalImports.push(moduleSpecifier);
      }
    });

    return {
      internalImports,
      externalImports,
      circularDependencies: [], // Calculated globally
      brokenImports: [], // Need global pass
      unusedExports: [], // Need global pass
      barrelExports: exports
        .map((e) => e.getModuleSpecifierValue())
        .filter((val): val is string => val !== undefined),
      relativeImports,
      absoluteImports,
      importCount: imports.length,
      exportCount: exports.length,
      dependencyCount: internalImports.length + externalImports.length,
      reverseDependencyCount: 0, // Calculated globally
    };
  }
}
