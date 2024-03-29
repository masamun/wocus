import { DEFAULT_MILESTONE_FILEDS, DEFAULT_MILESTONE_SUMMARIES } from "~/server/graphql/util/milestoneTypes";
import type { MutationResolvers } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

export const createMilestone: NonNullable<MutationResolvers['createMilestone']> = async (
  _parent,
  _arg,
  _ctx: WocusContext
) => {
  console.info(`createMilestone ${_arg?.param?.name}`);

  const projectName = _arg.param.project;
  const name = _arg.param.name;

  const projectId = await _ctx.prisma.project.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      name: projectName,
    },
  });

  const result = await _ctx.prisma.project.findFirst({
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

  return await _ctx.prisma.milestone.create({
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
