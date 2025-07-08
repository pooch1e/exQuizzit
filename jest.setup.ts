// jest.setup.ts

import { prisma, cleanTestDatabase, resetTestSequences } from './src/app/lib/prisma.ts';
import { seedTestDatabase } from './prisma/seed-test-db.ts';


beforeAll(async () => {
  // Ensure we're in test environment
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Tests must be run with NODE_ENV=test');
  }
  
  // Clean and reset the database
  await cleanTestDatabase();
  await resetTestSequences();
  
  // Seed with test data
  await seedTestDatabase(prisma);
});

// Clean up after each test
afterEach(async () => {
  
  await cleanTestDatabase();
  await resetTestSequences();
  await seedTestDatabase(prisma);
});

// Global test teardown
afterAll(async () => {
  await prisma.$disconnect();
});