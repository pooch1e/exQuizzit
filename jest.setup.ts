// jest.setup.ts
import { loadEnvConfig } from '@next/env';

// Load test environment variables
loadEnvConfig(process.cwd(), true);

beforeEach(async () => {
  // Import the functions you need
  const { cleanTestDatabase, resetTestSequences } = await import('./src/app/lib/prisma.ts');
  const { main } = await import('./prisma/seed.ts'); 
  
  // Clean the database
  await cleanTestDatabase();
  
  // Reset sequences if the function exists
  if (resetTestSequences) {
    await resetTestSequences();
  }
  
  // Seed with test data
  await main();
});

afterAll(async () => {
  const { prisma } = await import('./src/app/lib/prisma.ts');
  await prisma.$disconnect();
});