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
  Project: projectResolvers.Project,
};
