import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables conditionally
const isTestEnv = process.env.NODE_ENV === "test" || undefined;

dotenv.config({
  path: isTestEnv
    ? path.resolve(__dirname, "../../.env.test")
    : path.resolve(__dirname, "../../.env"),
});

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export default prisma;
