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
          profilePictureUrl,
        },
      });
    },
  },
};
