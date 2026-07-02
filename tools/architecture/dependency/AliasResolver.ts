import { Project, SourceFile } from 'ts-morph';
import * as path from 'path';
import { ROOT_DIR } from '../core/Constants';
import { Logger } from '../core/Logger';

export class AliasResolver {
  private project: Project;

  constructor(project: Project) {
    this.project = project;
  }

  resolve(importString: string, sourceFile: SourceFile): string | null {
    // Attempt to resolve the module specifier using the TS compiler
    // For now, we will rely on ts-morph's internal resolution if needed, 
    // but often we just need to classify it as absolute/relative/alias.
    
    if (importString.startsWith('.')) return 'relative';
    if (importString.startsWith('@/')) return 'alias';
    
    return 'external';
  }
}
