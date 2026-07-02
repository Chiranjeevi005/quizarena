import { DomainResolver } from './DomainResolver';
import { LayerResolver } from './LayerResolver';
import { FeatureResolver } from './FeatureResolver';
import { ResponsibilityResolver } from './ResponsibilityResolver';
import { FileRecord, OwnershipMetadata, Domain, Layer } from '../config/architecture.types';
import * as path from 'path';

export class OwnershipAnalyzer {
  static analyze(record: FileRecord): OwnershipMetadata {
    const relativePath = record.metadata.relativePath;
    const fileName = path.basename(record.metadata.absolutePath);

    const domain = DomainResolver.resolve(relativePath);
    const layer = LayerResolver.resolve(relativePath, fileName);
    const feature = FeatureResolver.resolve(relativePath);
    const responsibility = ResponsibilityResolver.resolve(layer, feature, domain);

    let confidenceScore = 1.0;

    if (domain === Domain.Unknown) confidenceScore -= 0.3;
    if (layer === Layer.Unknown) confidenceScore -= 0.3;
    if (feature === 'Core' && !relativePath.includes('core')) confidenceScore -= 0.1;

    // Ensure score is between 0.0 and 1.0
    confidenceScore = Math.max(0, Math.min(1.0, confidenceScore));

    return {
      domain,
      feature,
      layer,
      responsibility,
      confidenceScore
    };
  }
}
