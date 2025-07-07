import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Test utility functions
export const cleanTestDatabase = async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('cleanTestDatabase can only be used in test environment');
  }
  
  // Get all table names from your Prisma schema
  // Replace these with your actual table names
  const tablenames = await prisma.$queryRaw<Array<{tablename: string}>>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;
  
  // Clean all tables
  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
    }
  }
};

export const resetTestSequences = async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('resetTestSequences can only be used in test environment');
  }
  
  // Reset all sequences (for auto-incrementing IDs)
  const sequences = await prisma.$queryRaw<Array<{sequence_name: string}>>`
    SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public'
  `;
  
  for (const { sequence_name } of sequences) {
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "public"."${sequence_name}" RESTART WITH 1;`);
  }
};