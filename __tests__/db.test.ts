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

  describe('test countries table', () => {
    test('Countries has user id column', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          userId : 1
        }
      })
      expect(country).toHaveProperty('userId')
      expect(country).not.toBeUndefined();
    })
    test('User id is of type number', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          userId : 1
        }
      })
      expect(typeof country?.userId).toBe('number')
    })
    test('Countries table has country name', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          name : "Japan"
        }
      })
      expect(country).toHaveProperty('name')
      expect(country?.name).not.toBeUndefined();

    })
    test('Country name is a string', async () => {
      const country = await prisma.countries.findFirst({
              where: {
                name : "Japan"
              }
            })
        expect(typeof country?.name).toBe('string');
    })
    test('Country has flag url', async () => {
      const country = await prisma.countries.findFirst({
              where: {
                flagUrl : "https://flagcdn.com/w320/jp.png"
              }
            })
            expect(country).toHaveProperty('flagUrl')
            expect(country?.flagUrl).not.toBeUndefined();
            
    })
    test('Country flag is a string', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          flagUrl : "https://flagcdn.com/w320/jp.png"
        }
      })
      expect(typeof country?.flagUrl).toBe('string');
    })
    test('Country has capital city', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          capital: 'Tokyo'
        }
      })
      expect(country).toHaveProperty('capital')
      expect(country).not.toBeUndefined();
    })
    test('Capital city is a string', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          capital: 'Tokyo'
        }
      })
      expect(typeof country?.capital).toBe('string');
    })
    test('Country has currency', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          currency: 'JPY'
        }
      })
      expect(country).toHaveProperty('currency')
      expect(country).not.toBeUndefined();
    })
    test('Currency is a number', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          currency: 'JPY'
        }
      })
      expect(typeof country?.currency).toBe('string');
      
    })
    test('Country has population', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          population: 125800000
        }
      })
      expect(country).toHaveProperty('population')
      expect(country).not.toBeUndefined();
    })
    test('Population is a number', async () => {
      const country = await prisma.countries.findFirst({
        where: {
          population: 125800000
        }
      })
      expect(typeof country?.population).toBe('number');
    })
  })

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
