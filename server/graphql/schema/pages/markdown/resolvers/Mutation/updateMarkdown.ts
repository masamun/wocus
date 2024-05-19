import type { MutationResolvers } from "./../../../../types.generated";

export const updateMarkdown: NonNullable<MutationResolvers["updateMarkdown"]> = async (_parent, _arg, _ctx) => {
  console.info(`updateMarkdown ${_arg.param.markdownId}`);

  try {
    await _ctx.prisma.markdown.update({
      data: {
        text: _arg.param.text,
      },
      where: {
        id: _arg.param.markdownId,
      },
    });
  }
  catch (e) {
    console.info(e);
    return false;
  }
  return true;
};
