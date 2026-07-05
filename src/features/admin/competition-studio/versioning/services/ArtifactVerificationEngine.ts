/**
 * Artifact Verification Engine
 *
 * Independently recalculates hashes to verify artifact integrity.
 */

import { CompetitionVersionArtifact } from "../types/artifact.types";
import { VersionVerificationService } from "./VersionVerificationService";

export class ArtifactVerificationEngineService {
  verify(artifact: CompetitionVersionArtifact): boolean {
    return VersionVerificationService.verify(artifact);
  }
}

export const ArtifactVerificationEngine = new ArtifactVerificationEngineService();
