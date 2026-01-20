import 'package:graphql_flutter/graphql_flutter.dart';

class GraphqlService {
  final GraphQLClient client;

  GraphqlService(this.client);

  static const String getUsersQuery = r'''
    query GetUsers {
      users(isActive: true) {
        id
        name
        email
        profilePictureUrl
        createdAt
      }
    }
  ''';
}
