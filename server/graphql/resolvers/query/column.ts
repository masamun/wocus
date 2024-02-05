import type { Context } from "../../context";
import type { QueryResolvers } from "../../resolvers-types";

export const milestones: QueryResolvers["milestones"] = async (_, _args, context: Context) => {
  console.info(`query milestones ${_args?.param?.projectName}`);
  if (_args?.param?.projectName === undefined) {
    console.info(`query milestones undefined projectName`);
    return [];
  }
  const projectId = await context.prisma.project.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      name: _args.param.projectName,
    },
  });
  console.info(`query milestones projectId ${projectId.id}`);
  return await context.prisma.milestone.findMany({
    select: {
      id: true,
      projectId: true,
      name: true,
      start_at: true,
      end_at: true,
      created_at: true,
      updated_at: true,
      fields: true,
      summaries: true,
    },
    where: {
      projectId: projectId.id,
    },
  });
};
