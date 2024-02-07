import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";
import { DEFAULT_MILESTONE_FILEDS, DEFAULT_MILESTONE_SUMMARIES } from "../../util/milestoneTypes";

export const createMilestone: MutationResolvers["createMilestone"] = async (_, _args, context: Context) => {
  console.info(`createMilestone ${_args?.param?.name}`);

  const projectName = _args.param.project;
  const name = _args.param.name;

  const projectId = await context.prisma.project.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      name: projectName,
    },
  });

  const result = await context.prisma.project.findFirst({
    select: {
      milestones: {
        select: {
          id: true,
        },
      },
    },
    where: {
      name: projectName,
    },
  });
  // TODO
  if ((result?.milestones.length ?? 0) >= 50) {
    throw new Error(`マイルストーンはこれ以上作れません ${result?.milestones.length ?? 0}`);
  }
  console.info(`milestone count ${result?.milestones.length ?? 0}`);

  return await context.prisma.milestone.create({
    include: {
      fields: true,
      summaries: true,
    },
    data: {
      project: {
        connect: {
          id: projectId.id,
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
};
