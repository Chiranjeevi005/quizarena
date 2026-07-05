import { FileRecord, Classification } from "../config/architecture.types";

export class ClassificationEngine {
  static classify(record: FileRecord): { status: Classification; reason: string } {
    const path = record.metadata.relativePath.toLowerCase();

    if (path.includes("/shared/") || path.includes("/components/ui/")) {
      return { status: Classification.SHARED, reason: "Located in shared directory" };
    }

    if (path.includes("deprecated") || path.includes("legacy")) {
      return { status: Classification.LEGACY, reason: "Matched legacy naming pattern" };
    }

    // Default to ACTIVE for most application code
    return { status: Classification.ACTIVE, reason: "Standard application file" };
  }
}
