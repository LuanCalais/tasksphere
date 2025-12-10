import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum TaskStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  type User {
    id: ID!
    name: String!
    email: String!
    projects: [Project!]!
    tasks: [Task!]!
    createdAt: String!
  }

  type Project {
    id: ID!
    name: String!
    description: String
    owner: User!
    tasks: [Task!]!
    createdAt: String!
  }

  type Task {
    id: ID!
    title: String!
    status: TaskStatus!
    project: Project!
    assignee: User
    dueDate: String
    createdAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User

    projects: [Project!]!
    project(id: ID!): Project

    tasksByProject(projectId: ID!): [Task!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createProject(name: String!, description: String, ownerId: ID!): Project!
    createTask(title: String!, projectId: ID!, assigneeId: ID, dueDate: String): Task!
    updateTaskStatus(taskId: ID!, status: TaskStatus!): Task!
  }
`