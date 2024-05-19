import type FactoryMethod from "./interface";
import type { PrismaClient } from "~/prisma";

export const markdownFactory = (): FactoryMethod<string> => {
  const create = async (prisma: PrismaClient, projectId: string, _: string) => {
    const result = await prisma.markdown.create({
      data: {
        projectId: projectId,
        text: "",
      },
    });

    return result.id;
  };

  return {
    create,
  };
};
