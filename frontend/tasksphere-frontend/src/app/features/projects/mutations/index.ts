import { gql } from 'apollo-angular';

export const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $description: String, $ownerId: ID!) {
    createProject(name: $name, description: $description, ownerId: $ownerId) {
      id
      name
      description
      createdAt
      owner {
        id
        name
        email
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
