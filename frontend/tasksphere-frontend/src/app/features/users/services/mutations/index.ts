import { gql } from 'apollo-angular';

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $profilePictureUrl: String) {
    createUser(name: $name, email: $email, profilePictureUrl: $profilePictureUrl) {
      id
      name
      email
      isActive
      profilePictureUrl
      createdAt
    }
  }
`;
