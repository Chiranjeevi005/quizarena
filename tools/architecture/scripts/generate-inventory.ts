import { InventoryGenerator } from '../inventory/InventoryGenerator';
import { InventoryReporter } from '../reporting/InventoryReporter';
import { Logger } from '../core/Logger';

async function main() {
  Logger.info('Starting Architecture Inventory Scan...');
  
  try {
    const { records, sharedCandidates, duplicates, summary } = InventoryGenerator.generate();
    
    Logger.info(`Scan complete. Found ${records.length} files.`);
    
    InventoryReporter.generate(records, sharedCandidates, duplicates, summary);
    
    Logger.info('Reports generated successfully in tools/architecture/reports/');
  } catch (e) {
    Logger.error('Failed to generate inventory', e);
    process.exit(1);
  }
}

main();
