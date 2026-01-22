import { ProjectStatus, TaskStatus } from "@prisma/client";
import { PrismaClientContext } from "../features/prisma";

export const taskResolvers = {
  Query: {
    tasksByProject: async (
      _: unknown,
      { projectId }: { projectId: string },
      { prisma }: PrismaClientContext,
    ) => {
      try {
        const id = Number(projectId);

        if (Number.isNaN(id)) {
          throw new Error("ID do projeto inválido");
        }

        const tasks = await prisma.task.findMany({
          where: { projectId: id },
          include: { assignee: true },
        });

        return tasks ?? [];
      } catch (error) {
        console.error("Error Query.tasksByProject:", error);
        throw new Error("Não foi possível buscar as tasks do projeto");
      }
    },
  },

  Mutation: {
    updateTaskStatus: async (
      _: unknown,
      { taskId, status }: { taskId: string; status: TaskStatus },
      { prisma }: PrismaClientContext,
    ) => {
      try {
        const id = Number(taskId);

        if (Number.isNaN(id)) {
          throw new Error("ID da task inválido");
        }

        const existingTask = await prisma.task.findUnique({
          where: { id },
          select: { id: true, status: true, projectId: true },
        });

        if (!existingTask) {
          throw new Error("Task não encontrada");
        }

        const updatedTask = await prisma.$transaction(async (tx) => {
          await tx.task.update({
            where: { id },
            data: { status },
          });

          const projectId = existingTask.projectId;

          if (projectId === null) {
            throw new Error("A task não está associada a nenhum projeto");
          }

          const tasks = await tx.task.findMany({
            where: { projectId },
            select: { status: true },
          });

          let newProjectStatus: ProjectStatus = ProjectStatus.TODO;

          const hasInProgressTasks = tasks.some(
            (t) =>
              t.status === TaskStatus.IN_PROGRESS ||
              t.status === TaskStatus.DONE,
          );

          const allTasksDone = tasks.every((t) => t.status === TaskStatus.DONE);

          if (allTasksDone) {
            newProjectStatus = ProjectStatus.DONE;
          } else if (hasInProgressTasks) {
            newProjectStatus = ProjectStatus.IN_PROGRESS;
          } else {
            newProjectStatus = ProjectStatus.TODO;
          }

          const project = await tx.project.findUnique({
            where: { id: projectId },
            select: { status: true },
          });

          if (!project) {
            throw new Error("Não foi possível encontrar o projeto");
          }

          if (project.status !== newProjectStatus) {
            await tx.project.update({
              where: { id: projectId },
              data: { status: newProjectStatus },
            });
          }

          const updated = await tx.task.findUnique({
            where: { id },
            include: { project: true, assignee: true },
          });

          if (!updated) {
            throw new Error("Erro ao buscar task atualizada");
          }

          return updated;
        });
        console.log("Task atualizada com sucesso:", updatedTask);
        return updatedTask;
      } catch (error) {
        console.error("Error Mutation.updateTaskStatus:", error);
        throw new Error("Não foi possível atualizar o status da task");
      }
    },
  },
};
