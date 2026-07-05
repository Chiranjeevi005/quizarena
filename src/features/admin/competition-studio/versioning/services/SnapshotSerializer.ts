import { CompetitionSnapshotDTO } from "../types/version.types";

export class SnapshotSerializer {
  /**
   * Deterministically serializes a snapshot DTO.
   * This ensures that identical input states always produce the exact same JSON string,
   * regardless of key insertion order or JS object property iteration order.
   */
  static serialize(snapshot: CompetitionSnapshotDTO): string {
    return this.stableStringify(snapshot);
  }

  /**
   * Sorts keys and standardizes arrays for deterministic hashing.
   */
  public static stableStringify(obj: any): string {
    if (obj === undefined) return "null";
    if (obj === null) return "null";

    if (typeof obj !== "object") {
      return JSON.stringify(obj);
    }

    if (Array.isArray(obj)) {
      const stringifiedArray = obj.map((item) => this.stableStringify(item));
      return `[${stringifiedArray.join(",")}]`;
    }

    const keys = Object.keys(obj).sort();
    const keyValPairs = keys.map((key) => {
      const val = this.stableStringify(obj[key]);
      return `"${key}":${val}`;
    });

    return `{${keyValPairs.join(",")}}`;
  }
}
