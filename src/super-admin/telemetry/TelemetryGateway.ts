export interface TelemetryEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}

export interface TelemetryProvider {
  track(event: TelemetryEvent): void;
}

class ConsoleTelemetryAdapter implements TelemetryProvider {
  track(event: TelemetryEvent) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Telemetry] ${event.name}`, event.properties);
    }
  }
}

class TelemetryFacade {
  private providers: TelemetryProvider[] = [];

  register(provider: TelemetryProvider) {
    this.providers.push(provider);
  }

  track(eventName: string, properties?: Record<string, any>) {
    const event: TelemetryEvent = {
      name: eventName,
      properties,
      timestamp: Date.now(),
    };
    this.providers.forEach((provider) => provider.track(event));
  }
}

class TelemetryGatewayClass {
  private facade = new TelemetryFacade();

  constructor() {
    this.facade.register(new ConsoleTelemetryAdapter());
  }

  // Audit Hooks
  trackNavigationVisited(path: string, workspace: string) {
    this.facade.track("NavigationVisited", { path, workspace });
  }

  trackWidgetOpened(widgetId: string, workspace: string) {
    this.facade.track("WidgetOpened", { widgetId, workspace });
  }

  trackWidgetPinned(widgetId: string, workspace: string) {
    this.facade.track("WidgetPinned", { widgetId, workspace });
  }

  trackPreferenceChanged(key: string, value: any, workspace: string) {
    this.facade.track("PreferenceChanged", { key, value, workspace });
  }

  trackWorkspaceChanged(oldWorkspace: string, newWorkspace: string) {
    this.facade.track("WorkspaceChanged", { oldWorkspace, newWorkspace });
  }

  trackAnnouncementDismissed(announcementId: string, workspace: string) {
    this.facade.track("AnnouncementDismissed", { announcementId, workspace });
  }

  trackCommandExecuted(commandId: string, workspace: string) {
    this.facade.track("CommandExecuted", { commandId, workspace });
  }
}

export const TelemetryGateway = new TelemetryGatewayClass();
