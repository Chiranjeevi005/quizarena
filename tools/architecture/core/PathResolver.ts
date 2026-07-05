import * as path from "path";
import { ROOT_DIR } from "./Constants";

export class PathResolver {
  static getRelativePath(absolutePath: string): string {
    return path.relative(ROOT_DIR, absolutePath).replace(/\\/g, "/");
  }

  static getExtension(absolutePath: string): string {
    return path.extname(absolutePath);
  }
}
