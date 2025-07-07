import { loadEnvConfig } from '@next/env';

// Load test environment variables
loadEnvConfig(process.cwd(), true);

beforeEach(async () => {
  const { cleanTestDatabase, resetTestSequences } = await import(
    './src/app/lib/prisma.ts'
  );
  await cleanTestDatabase();
  if (resetTestSequences) {
    await resetTestSequences();
  }
});

afterAll(async () => {
  const { prisma } = await import('./src/app/lib/prisma.ts');
  await prisma.$disconnect();
});
