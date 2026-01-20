import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:tasksphere_monitor/models/user.dart';

class GraphqlService {
  final GraphQLClient client;

  GraphqlService(this.client);

  static const String GET_USERS = r'''
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

  Future<List<User>> fetchUsers() async {
    final res = await client.query(QueryOptions(
        document: gql(GET_USERS), fetchPolicy: FetchPolicy.networkOnly));
    if (res.hasException) throw res.exception!;
    final list = (res.data!['users'] as List).cast<Map<String, dynamic>>();
    return list.map((json) => User.fromJson(json)).toList();
  }
}
