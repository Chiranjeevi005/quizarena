import { RepositoryScanner } from './RepositoryScanner';
import { OwnershipAnalyzer } from '../ownership/OwnershipAnalyzer';
import { ClassificationEngine } from './ClassificationEngine';
import { DependencyAnalyzer } from '../dependency/DependencyAnalyzer';
import { SharedCandidateEngine, SharedCandidate } from './SharedCandidateEngine';
import { DuplicateDetection, DuplicateRecommendation } from './DuplicateDetection';
import { FileRecord, ArchitectureSummary } from '../config/architecture.types';
import { Project } from 'ts-morph';
import { ROOT_DIR } from '../core/Constants';
import * as path from 'path';

export class InventoryGenerator {
  static generate(): {
    records: FileRecord[],
    sharedCandidates: SharedCandidate[],
    duplicates: DuplicateRecommendation[],
    summary: ArchitectureSummary
  } {
    const records = RepositoryScanner.scan();
    
    const project = new Project({
      tsConfigFilePath: path.join(ROOT_DIR, 'tsconfig.json'),
      skipAddingFilesFromTsConfig: true
    });

    for (const record of records) {
      // Ownership
      record.ownership = OwnershipAnalyzer.analyze(record);
      
      // Classification
      record.classification = ClassificationEngine.classify(record);

      // Dependencies (only for TS/TSX files)
      if (record.metadata.extension === '.ts' || record.metadata.extension === '.tsx') {
        try {
          const sourceFile = project.addSourceFileAtPath(record.metadata.absolutePath);
          record.dependencies = DependencyAnalyzer.analyze(sourceFile);
        } catch (e) {
          // If a file cannot be parsed, log it but don't crash
          console.warn(`Could not parse AST for ${record.metadata.relativePath}`);
        }
      }
    }

    // Now that we have all basic dependencies, we could build graphs (omitted for brevity but we have GraphTools)

    const sharedCandidates = SharedCandidateEngine.evaluate(records);
    const duplicates = DuplicateDetection.evaluate(records);

    const summary = this.generateSummary(records, sharedCandidates, duplicates);

    return { records, sharedCandidates, duplicates, summary };
  }

  private static generateSummary(records: FileRecord[], shared: SharedCandidate[], duplicates: DuplicateRecommendation[]): ArchitectureSummary {
    const sum = (layer: string) => records.filter(r => r.ownership?.layer === layer).length;
    
    const domains = new Set(records.map(r => r.ownership?.domain));
    
    return {
      pages: sum('Page'),
      layouts: sum('Layout'),
      components: sum('Component'),
      services: sum('Service'),
      repositories: sum('Repository'),
      stores: sum('Store'),
      hooks: sum('Hook'),
      validators: sum('Validator'),
      types: sum('Type'),
      contexts: sum('Context'),
      utilities: sum('Utility'),
      actions: sum('Action'),
      controllers: sum('Controller'),
      events: sum('Event'),
      commands: sum('Command'),
      prismaModels: sum('Schema'),
      totalFiles: records.length,
      totalDirectories: 0, // Need directory scanner
      largestFeature: 'Unknown', // Could calculate by grouping records by feature
      mostDuplicatedLayer: 'Component',
      sharedCandidateCount: shared.length,
      legacyCount: records.filter(r => r.classification?.status === 'LEGACY').length,
      deleteCandidateCount: records.filter(r => r.classification?.status === 'DELETE').length,
      migrationCandidateCount: records.filter(r => r.classification?.status === 'MIGRATE').length,
      totalDomains: domains.size,
      largestDomain: 'Unknown',
      duplicateCount: duplicates.length,
      averageImportsPerFile: 0,
      averageExportsPerFile: 0,
      dependencyDepth: 0,
      circularDependencyCount: 0,
      unknownOwnershipCount: records.filter(r => r.ownership?.domain === 'Unknown').length
    };
  }
}
