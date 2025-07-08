import { prisma } from "../src/app/lib/prisma.ts"
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


  test('should find seeded countries table', async () => {
    // console.log(process.env) //showing test env
    const countries = await prisma.countries.findMany();
    expect(countries.length).toBeGreaterThan(0);
     
  });

  test('should find seeded users table', async () => {
    // console.log(process.env) //showing test env
    const user = await prisma.user.findMany();
    expect(user.length).toBeGreaterThan(0);
    
  });

  test('should find seeded games table', async () => {
    // console.log(process.env) //showing test env
    const game = await prisma.game.findMany();
    expect(game.length).toBeGreaterThan(0);
    console.log(game) // ensuring test is working
  });
})
