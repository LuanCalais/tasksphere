import { gql } from 'apollo-angular';

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $profilePictureUrl: String
    $cloudinaryPublicId: String
  ) {
    createUser(
      name: $name
      email: $email
      profilePictureUrl: $profilePictureUrl
      cloudinaryPublicId: $cloudinaryPublicId
    ) {
      id
      name
      email
      isActive
      profilePictureUrl
      cloudinaryPublicId
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!, $hardDelete: Boolean) {
    deleteUser(id: $id, hardDelete: $hardDelete) {
      id
      name
      email
      isActive
    }
  }
`;