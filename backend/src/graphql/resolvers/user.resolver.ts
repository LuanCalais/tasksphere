import {
  deleteFromCloudinary,
  extractPublicIdFromUrl,
} from "../../http/services/cloudinary.service";
import { PrismaClientContext } from "../features/prisma";
import { User, UserQueryArgs } from "../features/user/types";

export const userResolvers = {
  Query: {
    users: async (
      _: unknown,
      args: { isActive?: boolean },
      { prisma }: PrismaClientContext
    ) => {
      const where =
        args.isActive !== undefined ? { isActive: args.isActive } : {};

      return prisma.user.findMany({ where });
    },

    user: async (
      _: unknown,
      { id }: UserQueryArgs,
      { prisma }: PrismaClientContext
    ) => {
      return prisma.user.findUnique({ where: { id: Number(id) } });
    },
  },

  Mutation: {
    createUser: async (
      _: unknown,
      { name, email, profilePictureUrl, cloudinaryPublicId }: User,
      { prisma }: PrismaClientContext
    ) => {
      return prisma.user.create({
        data: {
          name,
          email,
          isActive: true,
          profilePictureUrl,
          cloudinaryPublicId,
        },
      });
    },

    deleteUser: async (
      _: unknown,
      { id, hardDelete }: { id: string; hardDelete?: boolean },
      { prisma }: PrismaClientContext
    ) => {
      console.log("Deleting user with id:", id);
      try {
        const existingUser = await prisma.user.findUnique({
          where: { id: Number(id) },
          include: {
            projects: {
              include: {
                tasks: true,
              },
            },
            tasks: true,
          },
        });

        if (!existingUser) {
          throw new Error(`User with id ${id} not found`);
        }

        if (hardDelete) {
          if (existingUser.profilePictureUrl) {
            try {
              let publicId = existingUser.cloudinaryPublicId;

              if (!publicId) {
                publicId = extractPublicIdFromUrl(
                  existingUser.profilePictureUrl
                );
              }

              if (publicId) {
                await deleteFromCloudinary(publicId);
                console.log(`Deleted Cloudinary image: ${publicId}`);
              }
            } catch (err) {
              console.log("Error deleting from Cloudinary:", err);
            }
          }
          await prisma.task.updateMany({
            where: { assigneeId: Number(id) },
            data: { assigneeId: null },
          });

          const projectsToDelete = existingUser.projects.map((p) => p.id);
          if (projectsToDelete.length) {
            await prisma.project.deleteMany({
              where: { id: { in: projectsToDelete } },
            });
            console.log(
              `Deleted ${projectsToDelete.length} projects and their tasks`
            );
          }

          const deletedUser = await prisma.user.delete({
            where: { id: Number(id) },
          });

          console.log("Deleted user:", deletedUser);
          return deletedUser;
        } else {
          const deletedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { isActive: false },
          });
          console.log("Soft deleted user:", deletedUser);
          return deletedUser;
        }
      } catch (e) {
        console.error("Error deleting user:", e);
        throw new Error("Could not delete user" + e);
      }
    },
  },
};
