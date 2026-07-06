/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "question_governance_audits" DROP CONSTRAINT IF EXISTS "question_governance_audits_questionId_fkey"`
    );
    console.log("Constraint dropped successfully.");
  } catch (error) {
    console.error("Error dropping constraint:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
