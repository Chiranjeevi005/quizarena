import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();
import { getRazorpayInstance } from "../adapters/razorpay/RazorpayConfig";

export class SettlementSyncWorker {
  public async syncSettlements(count: number = 10, skip: number = 0) {
    const razorpay = getRazorpayInstance();

    try {
      const response = await razorpay.settlements.all({ count, skip });

      for (const item of response.items) {
        await prisma.settlementRecord.upsert({
          where: { razorpaySettlementId: item.id },
          update: {
            status: item.status,
            utr: item.utr,
            settledAt: item.status === "processed" ? new Date() : null,
          },
          create: {
            razorpaySettlementId: item.id,
            status: item.status,
            amount: Number(item.amount) / 100,
            currency: "INR", // Default to INR since it's not strictly on Settlement entity
            fees: item.fees ? Number(item.fees) / 100 : 0,
            tax: item.tax ? Number(item.tax) / 100 : 0,
            utr: item.utr,
            settledAt: item.status === "processed" ? new Date() : null,
          },
        });
      }

      console.log(`Synced ${response.items.length} settlements from Razorpay.`);
    } catch (error) {
      console.error("Failed to sync settlements:", error);
    }
  }
}
