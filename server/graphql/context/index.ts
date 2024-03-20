import { createPrismaClient } from "@/prisma";

const prisma = await createPrismaClient();

export type WocusContext = {
  prisma: typeof prisma;
};
export const createContext: () => Promise<WocusContext> = async () => {
  return {
    prisma,
  };
};
