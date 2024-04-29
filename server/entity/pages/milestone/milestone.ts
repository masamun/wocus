import type { PrismaClient } from "~/prisma";
import { DEFAULT_MILESTONE_FILEDS, DEFAULT_MILESTONE_SUMMARIES } from "~/server/graphql/util/milestoneTypes";

export const createMilestone = async (prisma: PrismaClient, projectId: string, name: string) => {
  const result = await prisma.milestone.create({
    include: {
      fields: true,
      summaries: true,
    },
    data: {
      project: {
        connect: {
          id: projectId,
        },
      },
      name,
      fields: {
        createMany: {
          data: DEFAULT_MILESTONE_FILEDS,
        },
      },
      summaries: {
        createMany: {
          data: DEFAULT_MILESTONE_SUMMARIES,
        },
      },
    },
  });

  return result.id;
};
