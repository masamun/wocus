import { milestoneFactory } from "./milestone";
import { markdownFactory } from "./markdown";
import type { PrismaClient } from "~/prisma";

type PageType = "milestone" | "markdown";

export const factory = () => {
  const create = (prisma: PrismaClient, type: PageType, projectId: string, name: string) => {
    switch (type) {
      case "milestone":
        return milestoneFactory().create(prisma, projectId, name);
      case "markdown":
        return markdownFactory().create(prisma, projectId, name);
    }
    throw Error(`未定義のtypeです ${type}`);
  };

  return {
    create,
  };
};
