import { gql } from 'apollo-angular';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      createdAt
      tasks {
        id
        title
        status
        color
        assignee {
          id
          name
          email
          profilePictureUrl
        }
      }
      owner {
        id
        name
        email
        profilePictureUrl
      }
    }
  }
`;
