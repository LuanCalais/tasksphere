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
