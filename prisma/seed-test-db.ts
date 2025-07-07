import { main } from "./seed";
import { cleanTestDatabase } from "@/app/lib/prisma";


beforeEach(async () => {
  await cleanTestDatabase(); 
  await main(); 
});

