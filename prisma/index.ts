import { Prisma, PrismaClient } from "@prisma/client";
import { Prisma as PrismaEdge, PrismaClient as PrismaClientEdge } from "@prisma/client/edge";

let prisma = PrismaEdge;
let prismaClient = PrismaClientEdge;
if (process.env.NODE_ENV === "development") {
  console.info("prisma module development");
  prisma = Prisma;
  prismaClient = PrismaClient;
}

export { prisma as Prisma };
export { prismaClient as PrismaClient };
