import { PrismaClient, IncidentStatus, AlertSeverity } from "@/generated/prisma";

const prisma = new PrismaClient();

export class IncidentEngine {
  /**
   * Workers detect and report incidents but only transition them to INVESTIGATING or RECOVERED.
   * They never transition to RESOLVED or CLOSED (reserved for Admins).
   */
  public async reportIncident(
    title: string,
    description: string,
    severity: AlertSeverity,
    competitionId?: string
  ): Promise<string> {
    const incident = await prisma.platformIncident.create({
      data: {
        title,
        description,
        severity,
        status: IncidentStatus.OPEN,
        competitionId,
        detectedAt: new Date(),
      },
    });

    // Auto-transition to investigating
    await prisma.platformIncident.update({
      where: { id: incident.id },
      data: { status: IncidentStatus.INVESTIGATING },
    });

    return incident.id;
  }

  /**
   * Automated worker successfully recovers from the incident.
   */
  public async markRecovered(incidentId: string, notes: string): Promise<void> {
    const incident = await prisma.platformIncident.findUnique({ where: { id: incidentId } });
    if (!incident) throw new Error("Incident not found");

    if (incident.status === IncidentStatus.RESOLVED || incident.status === IncidentStatus.CLOSED) {
      throw new Error("Cannot recover an incident that is already resolved or closed.");
    }

    await prisma.platformIncident.update({
      where: { id: incidentId },
      data: {
        status: IncidentStatus.RECOVERED,
        resolutionNotes: notes,
      },
    });
  }

  /**
   * Admin explicitly resolves the incident after human verification.
   */
  public async resolveIncident(incidentId: string, userId: string, notes: string): Promise<void> {
    await prisma.platformIncident.update({
      where: { id: incidentId },
      data: {
        status: IncidentStatus.RESOLVED,
        resolvedAt: new Date(),
        ownerId: userId,
        resolutionNotes: notes,
        durationMs: Date.now() - (await this.getDetectionTime(incidentId)),
      },
    });
  }

  /**
   * Admin formally closes the incident, archiving it.
   */
  public async closeIncident(incidentId: string, userId: string): Promise<void> {
    await prisma.platformIncident.update({
      where: { id: incidentId },
      data: {
        status: IncidentStatus.CLOSED,
        closedAt: new Date(),
        ownerId: userId,
      },
    });
  }

  private async getDetectionTime(incidentId: string): Promise<number> {
    const incident = await prisma.platformIncident.findUnique({ where: { id: incidentId } });
    return incident?.detectedAt.getTime() || Date.now();
  }
}
