import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";
import { DEFAULT_MILESTONE_FILEDS, DEFAULT_MILESTONE_SUMMARIES } from "../../util/milestoneTypes";

export const createMilestone: MutationResolvers["createMilestone"] = async (_, _args, context: Context) => {
  console.info(`createMilestone ${_args?.param?.name}`);

  if (_args?.param?.project === undefined) {
    console.warn(`createMilestone undefined project`);
    throw Error();
  }

  if (_args?.param?.name === undefined) {
    console.warn(`createMilestone undefined name`);
    throw Error();
  }
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
