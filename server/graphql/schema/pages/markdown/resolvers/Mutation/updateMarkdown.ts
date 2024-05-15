import type { MutationResolvers } from "./../../../../types.generated";
export const updateMarkdown: NonNullable<MutationResolvers['updateMarkdown']> = async (_parent, _arg, _ctx) => {
  console.warn(`updateMarkdown ${_arg.params.id}`);

  try {
    await _ctx.prisma.markdown.update({
      data: {
        text: _arg.params.text,
      },
      where: {
        id: _arg.params.id,
      },
    });
  } catch (e) {
    console.info(e);
    return false;
  }
  return true;
};
