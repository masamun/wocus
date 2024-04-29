import type { Prisma } from "~/prisma";
import type { MutationResolvers } from "./../../../types.generated";
import { factory } from "~/server/entity/pages/factory";

export const createMenu: NonNullable<MutationResolvers['createMenu']> = async (_parent, _arg, _ctx) => {
  console.debug(
    `mutation createMenu ${_arg.param.projectId} - Parent:${_arg.param.parentMenuId} - ${_arg.param.type} - ${_arg.param.name}`
  );

  // 親メニューが存在する場合はrelationの設定を行う
  const parent: Prisma.menuCreateNestedOneWithoutChildrenInput | undefined =
    _arg.param.parentMenuId != null
      ? {
          connect: {
            id: _arg.param.parentMenuId,
          },
        }
      : undefined;

  // ページの対象を作成する
  const pageId = await factory().create(_ctx.prisma, _arg.param.type, _arg.param.projectId, "無題");

  console.debug(`mutation createMenu pageId: ${pageId}`);

  const result = await _ctx.prisma.menu.create({
    include: {
      order: true,
      page: true,
    },
    data: {
      type: _arg.param.type,
      project: { connect: { id: _arg.param.projectId } },
      parent,
      name: _arg.param.name,
      order: {
        create: {
          order: _arg.param.order,
        },
      },
      page: {
        create: {
          componentId: pageId,
        },
      },
    },
  });

  return {
    id: result.id,
    parentId: result.parentId,
    order: result.order?.order ?? 1,
    pageId: result.page?.id ?? "",
    hierarchy: 0,
    name: result.name,
    type: result.type,
  };
};
