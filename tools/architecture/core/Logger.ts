export class Logger {
  static info(message: string) {
    console.log(`[INFO] ${message}`);
  }
  static warn(message: string) {
    console.warn(`[WARN] ${message}`);
  }
  static error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error || "");
  }
}
