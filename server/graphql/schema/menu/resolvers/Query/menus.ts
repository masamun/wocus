import type { QueryResolvers, Menu } from "./../../../types.generated";

export const menus: NonNullable<QueryResolvers['menus']> = async (_parent, _arg, _ctx) => {
  console.debug(`query menus ${_arg.param.projectId}`);

  const results = await _ctx.prisma.menu.findMany({
    select: {
      id: true,
      order: true,
      parent: true,
      type: true,
      page: true,
      name: true,
    },
    where: {
      projectId: _arg.param.projectId,
    },
  });

  return results.map((result): Menu => {
    return {
      id: result.id,
      name: result.name,
      parentId: result.parent?.id,
      order: result.order?.order ?? 1,
      pageId: result.page?.componentId ?? "",
      hierarchy: 0,
      type: result.type,
    };
  });
};
