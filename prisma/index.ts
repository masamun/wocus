import { Prisma, PrismaClient } from "@prisma/client";
// import { Prisma, PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

const createPrismaClient = async () => {
  return new PrismaClient() as unknown as PrismaClient;
  // return new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient;
};
export { Prisma, PrismaClient, createPrismaClient };
