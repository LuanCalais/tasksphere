import { projectResolvers } from "./project.resolver";
import { userResolvers } from "./user.resolver";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...projectResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...projectResolvers.Mutation,
  },
  User: {
    ...userResolvers.User,
  },
  Project: projectResolvers.Project,
};
