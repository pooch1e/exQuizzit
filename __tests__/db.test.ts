import {prisma} from "../src/app/lib/prisma.ts"
import { seedTestDatabase } from "../prisma/seed-test-db.ts"
import { cleanTestDatabase, resetTestSequences } from "../src/app/lib/prisma.ts";
  beforeEach(async () => {
    // Clean and re-seed before each test in this suite
    await cleanTestDatabase();
    await resetTestSequences();
    await seedTestDatabase(prisma);
  });

    afterAll(async () => {
    await prisma.$disconnect();
  });

describe('testing test-seed database', () => {


  test('should find seeded countries', async () => {
    // console.log(process.env) //showing test env
    const countries = await prisma.countries.findMany();
    expect(countries.length).toBeGreaterThan(0);
    console.log(countries) // ensuring test is working
  });
})
