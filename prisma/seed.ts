// prisma/seed.ts
import { prisma } from "../src/app/lib/prisma.ts"; 
import { users, countries, games } from '../src/data/test-data/index.js';

async function main() {
  console.log('Starting test database seeding...');
  
  try {
    // Clean existing data in correct order (respecting foreign key constraints)
    await prisma.game.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.countries.deleteMany({}); 
    
    console.log('Cleared existing data');
    
    
    const createdCountries = await prisma.countries.createMany({
      data: countries,
      skipDuplicates: true
    });
    console.log(`Seeded ${createdCountries.count} countries`);
    
    // Seed users
    const createdUsers = await prisma.user.createMany({
      data: users,
      skipDuplicates: true
    });
    console.log(`Seeded ${createdUsers.count} users`);
    
    // Seed game attempts
    const createdGames = await prisma.game.createMany({
      data: games,
      skipDuplicates: true
    });
    console.log(`Seeded ${createdGames.count} games`);
    
    console.log('Test database seeding completed successfully!');
    
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

// Export the main function so it can be called from tests
export { main };

// Run the seeding
main()
  .catch((error) => {
    console.error('Seeding error:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());