import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query GetUsers {
    users(isActive: true) {
      name
      id
      createdAt
      email
      profilePictureUrl
      isActive
    }
  }
`;
