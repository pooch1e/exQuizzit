//seed file
import prisma from "../src/app/lib/connections";
import {users, countries, games} from '../src/data/test-data/index'

export async function main() {
  try {


  await prisma.game.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.countries.deleteMany({})

  // Seed countries
  await prisma.countries.createMany({
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
    } catch (err) {
      console.log(err, 'Error during seeding')
      throw err;
    }
}

main()
  .catch((error) => {
    console.error('Seeding error:', error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())