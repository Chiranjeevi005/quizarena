export class EventDispatcher {
  private static handlers: Record<string, ((...args: any[]) => void)[]> = {};

  static subscribe(event: string, handler: (...args: any[]) => void) {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event].push(handler);
  }

  static dispatch(event: string, payload: any) {
    if (this.handlers[event]) {
      this.handlers[event].forEach((handler) => handler(payload));
    }
  }
}
