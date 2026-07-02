import * as fs from 'fs';
import * as path from 'path';
import { IGNORED_DIRECTORIES } from './Constants';
import { Logger } from './Logger';

export class FileWalker {
  static walk(dir: string, callback: (filePath: string) => void) {
    let files: string[];
    try {
      files = fs.readdirSync(dir);
    } catch (e) {
      Logger.error(`Failed to read directory: ${dir}`, e);
      return;
    }

    for (const file of files) {
      if (IGNORED_DIRECTORIES.includes(file)) {
        continue;
      }

      const fullPath = path.join(dir, file);
      let stat: fs.Stats;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {
        Logger.error(`Failed to stat: ${fullPath}`, e);
        continue;
      }

      if (stat.isDirectory()) {
        this.walk(fullPath, callback);
      } else {
        // Only include actual source files, maybe filter by extension?
        // Or let scanner do it. We let scanner do it.
        callback(fullPath);
      }
    }
  }
}
