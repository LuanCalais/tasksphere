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

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      owner {
        id
        name
        email
        profilePictureUrl
      }
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
    }
  }
`;
