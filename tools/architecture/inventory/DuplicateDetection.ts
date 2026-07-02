import { FileRecord } from '../config/architecture.types';
import * as path from 'path';

export interface DuplicateRecommendation {
  files: string[];
  similarityScore: number;
  reason: string;
}

export class DuplicateDetection {
  static evaluate(records: FileRecord[]): DuplicateRecommendation[] {
    const recommendations: DuplicateRecommendation[] = [];
    const nameMap = new Map<string, string[]>();

    for (const record of records) {
      const name = path.basename(record.metadata.relativePath);
      if (!nameMap.has(name)) nameMap.set(name, []);
      nameMap.get(name)!.push(record.metadata.relativePath);
    }

    for (const [name, files] of nameMap.entries()) {
      if (files.length > 1 && !['page.tsx', 'layout.tsx', 'route.ts', 'index.ts', 'index.tsx'].includes(name)) {
        recommendations.push({
          files,
          similarityScore: 0.8, // Naive score based on exact name match
          reason: `Same filename '${name}' found in multiple locations.`
        });
      }
    }

    return recommendations;
  }
}
