import type { MutationResolvers } from "./../../../types.generated";
import type { WocusContext } from "~/server/graphql/context";

export const deleteTask: NonNullable<MutationResolvers["deleteTask"]> = async (_parent, _arg, _ctx: WocusContext) => {
  console.info(`deleteTask ${_arg.param.taskId}`);

  try {
    await _ctx.prisma.task.delete({
      where: {
        id: _arg.param.taskId,
      },
    });
  }
  catch {
    return false;
  }
  return true;
};
