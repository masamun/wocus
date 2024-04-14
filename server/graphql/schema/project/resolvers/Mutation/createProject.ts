import type { WocusContext } from "~/server/graphql/context";
import type { MutationResolvers } from "./../../../types.generated";
import { DEFAULT_MILESTONE_FILEDS, DEFAULT_MILESTONE_SUMMARIES } from "~/server/graphql/util/milestoneTypes";

export const createProject: NonNullable<MutationResolvers['createProject']> = async (
  _parent,
  _arg,
  _ctx: WocusContext
) => {
  console.info(`createProject ${_arg.param.name}`);

  const name = _arg.param.name;

  const count = await _ctx.prisma.project.count({
    where: {
      name,
    },
  });
  if (count > 0) {
    throw new Error("同じ名前のプロジェクトが存在します");
  }
  const totalCount = await _ctx.prisma.project.count({});
  if (totalCount > 50) {
    throw new Error("プロジェクトはこれ以上作れません");
  }

  return await _ctx.prisma.project.create({
    data: {
      name,
      milestones: {
        create: {
          name: "default",
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
      },
    },
  });
};
