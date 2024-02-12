import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export type Context = {
  prisma: typeof prisma;
};
export const createContext: () => Promise<Context> = () => {
  return Promise.resolve({
    prisma,
  });
};
