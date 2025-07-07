//seed file
import prisma from "./src/app/lib/connections.ts";
import { users, countries, games } from "./src/data/test-data/index.js";

async function main() {
  await prisma.game.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.countries.deleteMany({});

  // Seed countries
  await prisma.countries.createMany({
    data: countries,
    skipDuplicates: true,
  });

  // Seed users
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  // Seed game attempts
  await prisma.game.createMany({
    data: games,
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error("Seeding error:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
