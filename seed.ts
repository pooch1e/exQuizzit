//seed file
import prisma from "@/app/lib/connections";
import {users, countries, games} from './src/data/test-data/index'

async function main() {
  
  await prisma.game.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.country.deleteMany({})

  // Seed countries
  await prisma.country.createMany({
    data: countries,
    skipDuplicates: true 
  })

  // Seed users
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true
  })

  // Seed game attempts
  await prisma.game.createMany({
    data: games,
    skipDuplicates: true
  })
}

main()
  .catch((error) => {
    console.error('Seeding error:', error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())