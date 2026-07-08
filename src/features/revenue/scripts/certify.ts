import { PrismaClient } from '@/generated/prisma';
import { RevenuePlatformCertificationService } from '../services/RevenuePlatformCertificationService';

async function main() {
  console.log('Starting Revenue Platform Certification...\n');

  const prisma = new PrismaClient();
  const service = new RevenuePlatformCertificationService(prisma, {});

  const result = await service.runCertification();

  console.log('--- Certification Checks ---');
  for (const [check, passed] of Object.entries(result.checks)) {
    console.log(`${passed ? '✓' : '✗'} ${check}`);
  }

  console.log('\n--- Result ---');
  console.log(`Revenue Platform Score: ${result.score}%`);
  console.log(`Status: ${result.status}`);

  await prisma.$disconnect();

  if (result.status === 'Critical Failure') {
    process.exit(1);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
