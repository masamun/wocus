import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";

export const createProject: MutationResolvers["createProject"] = async (_, _args, context: Context) => {
  console.info(`createProject ${_args.param.name}`);

  const name = _args.param.name;

  const count = await context.prisma.project.count({
    where: {
      name,
    },
  });
  if (count > 0) {
    throw new Error("同じ名前のプロジェクトが存在します");
  }
  // TODO
  if (count > 50) {
    throw new Error("プロジェクトはこれ以上作れません");
  }

  return await context.prisma.project.create({
    data: {
      name,
      milestones: {
        create: {
          name: "default",
        },
      },
    },
  });
};
