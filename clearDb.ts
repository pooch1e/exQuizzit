import prisma from "./src/app/lib/connections.ts";

async function clearDb() {
  await prisma.game.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.countries.deleteMany({});
  console.log("All data deleted.");
}

clearDb()
  .catch((error) => {
    console.error("Clear DB error:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
