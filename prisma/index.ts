import { Prisma, PrismaClient } from "@prisma/client/";
//export { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const createPrismaClient = () => {
  // return new PrismaClient();
  return new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient;
};
export { Prisma, PrismaClient, createPrismaClient };
