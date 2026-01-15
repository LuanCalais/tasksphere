import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum TaskStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  enum ProjectStatus {
    TODO
    IN_PROGRESS
    DONE
    CLOSE
  }

  input TaskInput {
    title: String!
    color: String
    assigneeId: ID
    dueDate: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    projects: [Project!]!
    tasks: [Task!]!
    profilePictureUrl: String
    cloudinaryPublicId: String
    isActive: Boolean!
    createdAt: String!
    projectCount: Int!
  }

  type Project {
    id: ID!
    name: String!
    isActive: Boolean!
    description: String
    owner: User!
    tasks: [Task!]!
    status: ProjectStatus!
    createdAt: String!
  }

  type Task {
    id: ID!
    title: String!
    color: String!
    status: TaskStatus!
    project: Project!
    assignee: User
    dueDate: String
    createdAt: String!
  }

  type Query {
    users(isActive: Boolean): [User!]!
    user(id: ID!): User
    projects: [Project!]!
    project(id: ID!): Project
    tasksByProject(projectId: ID!): [Task!]!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      profilePictureUrl: String
      cloudinaryPublicId: String
    ): User!
    deleteUser(id: ID!, hardDelete: Boolean): User!
    createProject(
      name: String!
      description: String
      ownerId: ID!
      tasks: [TaskInput!]
    ): Project!
    deleteProject(id: ID!): Project!
    createTask(
      title: String!
      color: String
      projectId: ID!
      assigneeId: ID
      dueDate: String
    ): Task!
    updateTaskStatus(taskId: ID!, status: TaskStatus!): Task!
  }
`;
