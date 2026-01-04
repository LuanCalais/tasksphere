import { PrismaClientContext } from "../features/prisma";
import { User, UserQueryArgs } from "../features/user/types";

export const userResolvers = {
  Query: {
    users: async (_: unknown, __: unknown, { prisma }: PrismaClientContext) => {
      return prisma.user.findMany();
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
      { name, email, profilePictureUrl }: User,
      { prisma }: PrismaClientContext
    ) => {
      return prisma.user.create({
        data: {
          name,
          email,
          isActive: true,
          profilePictureUrl,
        },
      });
    },

    deleteUser: async (
      _: unknown,
      { id }: { id: string },
      { prisma }: PrismaClientContext
    ) => {
      console.log("Deleting user with id:", id);
      try {
        const existingUser = await prisma.user.findUnique({
          where: { id: Number(id) },
        });

        if (!existingUser) {
          throw new Error(`User with id ${id} not found`);
        }

        const deletedUser = await prisma.user.update({
          where: { id: Number(id) },
          data: { isActive: false },
        });

        console.log("Deleted user:", deletedUser);
        return deletedUser;
      } catch (e) {
        console.error("Error deleting user:", e);
        throw new Error("Could not delete user" + e);
      }
    },
  },
};
