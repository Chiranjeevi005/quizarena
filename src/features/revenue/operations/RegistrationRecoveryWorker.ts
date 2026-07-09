import { PrismaClient, RegistrationState } from "../../../generated/prisma";

const prisma = new PrismaClient();

export class RegistrationRecoveryWorker {
  /**
   * Scans for CAPTURED payments where the Registration is NOT Enrolled.
   * This handles the edge case where payment succeeds but enrollment fails internally.
   */
  public async recoverEnrollments(): Promise<void> {
    const unrecovered = await prisma.paymentOrder.findMany({
      where: {
        status: "CAPTURED",
        registration: {
          state: { not: RegistrationState.ENROLLED },
        },
      },
      include: { registration: true },
    });

    for (const order of unrecovered) {
      console.log(`Recovering enrollment for Registration: ${order.registrationId}`);

      await prisma.registration.update({
        where: { id: order.registrationId },
        data: {
          state: RegistrationState.ENROLLED,
          enrolledAt: new Date(),
        },
      });

      await prisma.revenueAuditLog.create({
        data: {
          action: "REGISTRATION_RECOVERED",
          actorId: "SYSTEM_RECOVERY_WORKER",
          targetId: order.registrationId,
          reason: "Captured payment found without enrolled registration state",
          metadata: { paymentOrderId: order.id },
        },
      });
    }
  }
}
