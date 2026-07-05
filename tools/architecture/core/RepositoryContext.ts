import { FileRecord } from "../config/architecture.types";

export class RepositoryContext {
  private files: Map<string, FileRecord> = new Map();

  addFile(record: FileRecord) {
    this.files.set(record.metadata.absolutePath, record);
  }

  getFile(absolutePath: string): FileRecord | undefined {
    return this.files.get(absolutePath);
  }

  getAllFiles(): FileRecord[] {
    return Array.from(this.files.values());
  }

  getFilesByDomain(domain: string): FileRecord[] {
    return this.getAllFiles().filter((f) => f.ownership?.domain === domain);
  }
}
