import { gql } from 'apollo-angular';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      createdAt
      owner {
        id
        name
        email
        profilePictureUrl
      }
    }
  }
`;
