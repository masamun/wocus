import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      displayName: "管理者",
    },
  });
  console.log(admin);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
