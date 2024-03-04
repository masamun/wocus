import type { WocusContext } from "~/server/graphql/context";
import type { QueryResolvers } from "./../../../types.generated";

export const milestone: NonNullable<QueryResolvers['milestone']> = async (_parent, _arg, _ctx: WocusContext) => {
  console.info(`query milestone ${_arg?.param?.projectName}`);

  const result = await _ctx.prisma.project.findFirst({
    select: {
      milestones: {
        where: {
          name: _arg.param.milestoneName,
        },
      },
    },
    where: {
      name: _arg.param.projectName,
    },
  });
  const resultMilestone = result?.milestones?.pop();

  if (!resultMilestone) {
    console.warn(`query milestone not found ${_arg.param.projectName}/${_arg.param.milestoneName}`);
    throw Error();
  }
  return resultMilestone;
};
