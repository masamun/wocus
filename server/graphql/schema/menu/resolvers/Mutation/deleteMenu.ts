import type { MutationResolvers } from "./../../../types.generated";
import type { PrismaClient } from "@/prisma";

const recursive = async (prisma: Pick<PrismaClient, "menu">, parentId: string) => {
  const children = await prisma.menu.findMany({
    include: {
      children: true,
    },
    where: {
      parentId,
    },
  });

  if (children !== undefined) {
    for (const child of children) {
      await recursive(prisma, child.id);
    }

    return children.map(v => v.id);
  }
  return [];
};

export const deleteMenu: NonNullable<MutationResolvers["deleteMenu"]> = async (_parent, _arg, _ctx) => {
  console.debug(`mutation deleteMenu ${_arg.param.menuId}`);

  try {
    _ctx.prisma.$transaction(async (prisma) => {
      // 子メニューも消す
      if (_arg.param.recursive) {
        const childrenId = await recursive(prisma, _arg.param.menuId);

        await prisma.menu.deleteMany({
          where: {
            id: {
              in: childrenId,
            },
          },
        });
      }
      await prisma.menu.delete({
        where: {
          id: _arg.param.menuId,
        },
      });
    });
  }
  catch {
    return false;
  }
  return true;
};
