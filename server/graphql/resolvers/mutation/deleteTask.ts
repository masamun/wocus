import type { Context } from "../../context";
import type { MutationResolvers } from "../../resolvers-types";

export const deleteTask: MutationResolvers["deleteTask"] = async (_, _args, context: Context) => {
  console.info(`deleteTask ${_args.param.taskId}`);

  try {
    await context.prisma.task.delete({
      where: {
        id: _args.param.taskId,
      },
    });
  } catch {
    return false;
  }
  return true;
};
