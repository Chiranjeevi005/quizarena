export type MaintenanceMode = 'NONE' | 'SCHEDULED' | 'EMERGENCY' | 'READ_ONLY';

export class MaintenanceModeEngine {
  private currentMode: MaintenanceMode = 'NONE';
  private eta: Date | null = null;
  private message: string = '';

  public setMode(mode: MaintenanceMode, eta: Date, message: string): void {
    this.currentMode = mode;
    this.eta = eta;
    this.message = message;
  }

  public getStatus(): any {
    return {
      mode: this.currentMode,
      eta: this.eta,
      message: this.message,
      publishingDisabled: this.currentMode !== 'NONE',
      registrationsDisabled: this.currentMode === 'EMERGENCY' || this.currentMode === 'READ_ONLY'
    };
  }
}
