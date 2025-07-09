import { PrismaClient } from '@prisma/client/extension';
import { users, countries, games } from '../src/data/test-data/index.js';

export const seedTestDatabase = async (prismaClient? : PrismaClient) => {
  const prisma = prismaClient || new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL_TEST || process.env.DATABASE_URL,
      },
    },
  });



  try {
    //reset
    await prisma.game.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.countries.deleteMany({});

    const createdCountries = await prisma.countries.createMany({
      data: countries,
      skipDuplicates: true
    });


    // Seed users
    const createdUsers = await prisma.user.createMany({
      data: users,
      skipDuplicates: true
    });


    // Seed games last (likely references users and/or countries)
    const createdGames = await prisma.game.createMany({
      data: games,
      skipDuplicates: true
    });

  } catch (err) {
    console.log('error in seeding test db')
    throw err;
  } finally {
    if (!prisma.client) {
      await prisma.$disconnect();
    }
  }
}