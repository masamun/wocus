import type { WocusContext } from "~/server/graphql/context";
import type { QueryResolvers } from "./../../../types.generated";

export const milestone: NonNullable<QueryResolvers["milestone"]> = async (_parent, _arg, _ctx: WocusContext) => {
  console.info(`query milestone ${_arg.param.id}`);

  const result = await _ctx.prisma.milestone.findUnique({
    where: {
      id: _arg.param.id,
    },
  });
  return result;
};
