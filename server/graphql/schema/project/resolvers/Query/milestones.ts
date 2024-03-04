import type { WocusContext } from "~/server/graphql/context";
import type { QueryResolvers } from "./../../../types.generated";

export const milestones: NonNullable<QueryResolvers['milestones']> = async (_parent, _arg, _ctx: WocusContext) => {
  console.info(`query milestones ${_arg?.param?.projectName}`);

  const projectId = await _ctx.prisma.project.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      name: _arg.param.projectName,
    },
  });
  console.info(`query milestones projectId ${projectId.id}`);
  return await _ctx.prisma.milestone.findMany({
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
