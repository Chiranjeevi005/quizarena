import { FileWalker } from "../core/FileWalker";
import { PathResolver } from "../core/PathResolver";
import { FileRecord } from "../config/architecture.types";
import * as fs from "fs";
import * as path from "path";
import { ROOT_DIR } from "../core/Constants";

export class RepositoryScanner {
  static scan(targetDir: string = path.join(ROOT_DIR, "src")): FileRecord[] {
    const records: FileRecord[] = [];

    FileWalker.walk(targetDir, (filePath) => {
      const stat = fs.statSync(filePath);
      records.push({
        metadata: {
          absolutePath: filePath,
          relativePath: PathResolver.getRelativePath(filePath),
          extension: PathResolver.getExtension(filePath),
          size: stat.size,
          lastModified: stat.mtimeMs,
        },
      });
    });

    // Also scan Prisma schema if it exists outside src
    const prismaSchema = path.join(ROOT_DIR, "prisma", "schema.prisma");
    if (fs.existsSync(prismaSchema)) {
      const stat = fs.statSync(prismaSchema);
      records.push({
        metadata: {
          absolutePath: prismaSchema,
          relativePath: PathResolver.getRelativePath(prismaSchema),
          extension: ".prisma",
          size: stat.size,
          lastModified: stat.mtimeMs,
        },
      });
    }

    return records;
  }
}
