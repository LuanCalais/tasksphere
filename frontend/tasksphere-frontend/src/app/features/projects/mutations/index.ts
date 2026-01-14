import { gql } from 'apollo-angular';

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $description: String
    $ownerId: ID!
    $tasks: [TaskInput!]
  ) {
    createProject(name: $name, description: $description, ownerId: $ownerId, tasks: $tasks) {
      id
      name
      description
      createdAt
      owner {
        id
        name
        email
      }
      tasks {
        id
        title
        color
        status
        assignee {
          id
          name
          email
        }
        dueDate
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
      description
      owner {
        id
        name
        email
      }
    }
  }
`;
