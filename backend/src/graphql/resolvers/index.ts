import { projectResolvers } from "./project.resolver";
import { taskResolvers } from "./task.resolvers";
import { userResolvers } from "./user.resolver";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...projectResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...projectResolvers.Mutation,
    ...taskResolvers.Mutation,
  },
  User: {
    ...userResolvers.User,
  },
  Project: projectResolvers.Project,
};
