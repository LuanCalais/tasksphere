import { PrismaClientContext } from "../features/prisma";
import { Project } from "../features/project/types";

export const projectResolvers = {
  Query: {
    projects: async (
      _: unknown,
      __: unknown,
      { prisma }: PrismaClientContext
    ) => {
      try {
        const projects = await prisma.project.findMany({
          orderBy: { createdAt: "desc" },
        });

        return projects ?? [];
      } catch (error) {
        console.error("Error Query.projects: ", error);
        return [];
      }
    },
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
      console.log("Creating project with ownerId:", ownerId);
      return prisma.project.create({
        data: {
          name,
          description,
          ownerId: Number(ownerId),
        },
        include: {
          owner: true,
        },
      });
    },

    deleteProject: async (
      _: unknown,
      { id }: { id: string },
      { prisma }: PrismaClientContext
    ) => {
      console.log("Deleting project with id:", id);
      try {
        const existingProject = await prisma.project.findUnique({
          where: { id: Number(id) },
        });

        if (!existingProject) {
          throw new Error(`Project with id ${id} not found`);
        }

        const deletedProject = await prisma.project.delete({
          where: { id: Number(id) },
        });
        console.log("Deleted project:", deletedProject);
        return deletedProject;
      } catch (e) {
        console.error("Error deleting project:", e);
        throw new Error("Could not delete project" + e);
      }
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
