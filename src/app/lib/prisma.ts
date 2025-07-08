import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import path from 'path';

// Load environment-specific .env file
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

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
  
  const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;
  
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
  
  const sequences = await prisma.$queryRaw<Array<{ sequence_name: string }>>`
    SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public'
  `;
  
  for (const { sequence_name } of sequences) {
    await prisma.$executeRawUnsafe(`ALTER SEQUENCE "public"."${sequence_name}" RESTART WITH 1;`);
  }
};