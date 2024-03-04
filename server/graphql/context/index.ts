import { PrismaClient } from "@/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export type WocusContext = {
  prisma: typeof prisma;
};
export const createContext: () => Promise<WocusContext> = () => {
  return Promise.resolve({
    prisma,
  });
};
