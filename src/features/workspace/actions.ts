"use server";

import { prisma } from "@/lib/prisma";
import { AuditEntityType, AuditSeverity } from "@/generated/prisma";

export async function logWorkspaceAccessBlock({
  userId,
  role,
  viewportWidth,
  route,
}: {
  userId: string;
  role: string;
  viewportWidth: number;
  route: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        action: "WORKSPACE_ACCESS_BLOCKED",
        entityType: AuditEntityType.SYSTEM,
        actorId: userId,
        severity: AuditSeverity.LOW,
        metadata: {
          role,
          viewportWidth,
          route,
          reason: "UNSUPPORTED_VIEWPORT",
        },
      },
    });
  } catch (error) {
    console.error("[WORKSPACE GUARD] Failed to log access block:", error);
  }
}
