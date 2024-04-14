import type { MutationResolvers } from "./../../../types.generated";
export const renameMenu: NonNullable<MutationResolvers['renameMenu']> = async (_parent, _arg, _ctx) => {
  console.info(`mutation renameMenu ${_arg.param.menuId} ${_arg.param.name}`);
  try {
    await _ctx.prisma.menu.update({
      include: {
        order: true,
      },
      data: {
        name: _arg.param.name,
      },
      where: {
        id: _arg.param.menuId,
      },
    });
  } catch {
    return false;
  }
  return true;
};
