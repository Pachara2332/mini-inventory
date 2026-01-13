import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Keyboard",
        price: 1500,
        quantity: 10,
      },
      {
        name: "Mouse",
        price: 800,
        quantity: 25,
      },
      {
        name: "Monitor",
        price: 6500,
        quantity: 5,
      },
    ],
  });

  console.log("🌱 Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
