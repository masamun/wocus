import type { PrismaClient } from "~/prisma";
import type FactoryMethod from "./interface";

export const markdownFactory = (): FactoryMethod<string> => {
  const create = async (prisma: PrismaClient, projectId: string, name: string) => {
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
