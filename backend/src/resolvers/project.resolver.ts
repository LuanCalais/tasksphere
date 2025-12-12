import { PrismaClientContext } from "../features/prisma";
import { Project } from "../features/project/types";

export const projectResolvers = {
  Query: {
    projects: (_: unknown, __: unknown, { prisma }: PrismaClientContext) =>
      prisma.project.findMany(),

    project: (
      _: unknown,
      { id }: { id: string },
      { prisma }: PrismaClientContext
    ) => prisma.project.findUnique({ where: { id: Number(id) } }),
  },

  Mutation: {
    createProject: async (
      _: unknown,
      { name, description, ownerId }: Project,
      { prisma }: PrismaClientContext
    ) => {
      return prisma.project.create({
        data: {
          name,
          description,
          ownerId: Number(ownerId),
        },
      });
    },
  },

  Project: {
    owner: (parent: Project, _: unknown, { prisma }: PrismaClientContext) => {
      if (parent.ownerId == null) return null;

      return prisma.user.findUnique({ where: { id: parent.ownerId } });
    },

    tasks: (parent: Project, _: unknown, { prisma }: PrismaClientContext) => {
      if (parent.id == null) return null;

      return prisma.task.findMany({ where: { projectId: parent.id } });
    },
  },
};
