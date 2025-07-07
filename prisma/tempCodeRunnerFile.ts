import { main } from "./seed.ts";
import { cleanTestDatabase } from "@/app/lib/prisma.ts";


beforeEach(async () => {
  await cleanTestDatabase(); 
  await main(); 
});

