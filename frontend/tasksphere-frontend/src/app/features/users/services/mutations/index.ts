import { gql } from 'apollo-angular';

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $profilePicture: String) {
    createUser(name: $name, email: $email, profilePicture: $profilePicture) {
      id
      name
      email
      profilePicture
      createdAt
    }
  }
`;
