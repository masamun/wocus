import type { Context } from "../../context";
import type { QueryResolvers } from "../../resolvers-types";

export const milestone: QueryResolvers["milestone"] = async (_, _args, context: Context) => {
  console.info(`query milestone ${_args?.param?.projectName}`);
  if (_args?.param?.projectName === undefined) {
    console.warn(`query milestoneId undefined projectName`);
    throw Error();
  }
  if (_args?.param?.milestoneName === undefined) {
    console.warn(`query milestone undefined milestoneName`);
    throw Error();
  }
  const result = await context.prisma.project.findFirst({
    select: {
      milestones: {
        where: {
          name: _args.param.milestoneName,
        },
      },
    },
    where: {
      name: _args.param.projectName,
    },
  });
  const resultMilestone = result?.milestones?.pop();

  if (!resultMilestone) {
    console.warn(`query milestone not found ${_args.param.projectName}/${_args.param.milestoneName}`);
    throw Error();
  }
  return resultMilestone;
};
