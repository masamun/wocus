import type { QueryResolvers } from "./../../../../types.generated";
export const markdown: NonNullable<QueryResolvers["markdown"]> = async (_parent, _arg, _ctx) => {
  console.info(`query markdown ${_arg.param.markdownId}`);

  return await _ctx.prisma.markdown.findUniqueOrThrow({
    where: {
      id: _arg.param.markdownId,
    },
  });
};
