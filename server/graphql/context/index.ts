import { createPrismaClient } from "@/prisma";

const prisma = createPrismaClient();

export type WocusContext = {
  prisma: typeof prisma;
};
export const createContext: () => Promise<WocusContext> = () => {
  return Promise.resolve({
    prisma,
  });
};
