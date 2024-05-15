import type { PrismaClient } from "~/prisma";

export default interface FactoryMethod<T> {
  create(prisma: PrismaClient, projectId: string, name: string): Promise<T>;
}
