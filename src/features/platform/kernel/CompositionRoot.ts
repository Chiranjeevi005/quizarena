import { logger } from "./logger";

export class CompositionRoot {
  private static instance: CompositionRoot;

  private constructor() {}

  public static getInstance(): CompositionRoot {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new CompositionRoot();
    }
    return CompositionRoot.instance;
  }

  public initialize() {
    logger.info("Initializing Platform Kernel and Composition Root...");
    // Register global event/command handlers here
    logger.info("Platform Kernel initialized successfully.");
  }
}
