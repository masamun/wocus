import type { PrismaClient } from "~/prisma";
import { createMilestone } from "./milestone/milestone";

export const factory = () => {
  const create = (prisma: PrismaClient, type: string, projectId: string, name: string) => {
    switch (type) {
      case "milestone":
        return createMilestone(prisma, projectId, name);
    }
    throw Error(`未定義のtypeです ${type}`);
  };

  return {
    create,
  };
};
