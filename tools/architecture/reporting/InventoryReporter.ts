import * as fs from 'fs';
import * as path from 'path';
import { ROOT_DIR } from '../core/Constants';
import { FileRecord, ArchitectureSummary } from '../config/architecture.types';
import { SharedCandidate } from '../inventory/SharedCandidateEngine';
import { DuplicateRecommendation } from '../inventory/DuplicateDetection';

export class InventoryReporter {
  private static reportsDir = path.join(ROOT_DIR, 'tools', 'architecture', 'reports');

  static generate(
    records: FileRecord[],
    sharedCandidates: SharedCandidate[],
    duplicates: DuplicateRecommendation[],
    summary: ArchitectureSummary
  ) {
    if (!fs.existsSync(this.reportsDir)) {
      fs.mkdirSync(this.reportsDir, { recursive: true });
    }

    this.writeJson('repository-inventory.json', records);
    this.writeJson('architecture-summary.json', summary);
    this.writeJson('dependency-graph.json', records.map(r => ({ path: r.metadata.relativePath, deps: r.dependencies })));
    
    this.writeMarkdown('repository-inventory.md', this.formatInventory(records));
    this.writeMarkdown('architecture-summary.md', this.formatSummary(summary));
    this.writeMarkdown('shared-opportunities.md', this.formatShared(sharedCandidates));
    this.writeMarkdown('duplicate-report.md', this.formatDuplicates(duplicates));
    this.writeMarkdown('ownership-matrix.md', this.formatOwnership(records));
  }

  private static writeJson(filename: string, data: any) {
    fs.writeFileSync(path.join(this.reportsDir, filename), JSON.stringify(data, null, 2));
  }

  private static writeMarkdown(filename: string, content: string) {
    fs.writeFileSync(path.join(this.reportsDir, filename), content);
  }

  private static formatSummary(s: ArchitectureSummary): string {
    return `# Architecture Summary\n\n- Total Files: ${s.totalFiles}\n- Total Domains: ${s.totalDomains}\n- Unknown Ownership: ${s.unknownOwnershipCount}\n`;
  }

  private static formatInventory(records: FileRecord[]): string {
    let md = '# Repository Inventory\n\n| File | Domain | Layer | Status |\n|---|---|---|---|\n';
    for (const r of records) {
      md += `| ${r.metadata.relativePath} | ${r.ownership?.domain} | ${r.ownership?.layer} | ${r.classification?.status} |\n`;
    }
    return md;
  }

  private static formatShared(shared: SharedCandidate[]): string {
    let md = '# Shared Candidates\n\n| File | Suggested Layer | Priority | Reason |\n|---|---|---|---|\n';
    for (const s of shared) {
      md += `| ${s.path} | ${s.suggestedLayer} | ${s.migrationPriority} | ${s.reason} |\n`;
    }
    return md;
  }

  private static formatDuplicates(dups: DuplicateRecommendation[]): string {
    let md = '# Duplicate Report\n\n';
    for (const d of dups) {
      md += `## Suspected Duplicate (Score: ${d.similarityScore})\nReason: ${d.reason}\n\nFiles:\n`;
      d.files.forEach(f => md += `- ${f}\n`);
      md += '\n';
    }
    return md;
  }

  private static formatOwnership(records: FileRecord[]): string {
    let md = '# Ownership Matrix\n\n| File | Domain | Feature | Responsibility | Confidence |\n|---|---|---|---|---|\n';
    for (const r of records) {
      md += `| ${r.metadata.relativePath} | ${r.ownership?.domain} | ${r.ownership?.feature} | ${r.ownership?.responsibility} | ${r.ownership?.confidenceScore} |\n`;
    }
    return md;
  }
}
