import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class GraphQLConfig {
  static String httpEndpoint({required bool isAndroidEmulator}) {
    if (isAndroidEmulator) {
      return 'http://10.0.2.2:4000/graphql';
    }
    return 'http://localhost:4000/graphql';
  }

  static ValueNotifier<GraphQLClient> initClient(
      {required bool isAndroidEmulator}) {
    final httpLink =
        HttpLink(httpEndpoint(isAndroidEmulator: isAndroidEmulator));

    final authLink = AuthLink(getToken: () async => null);
    final link = authLink.concat(httpLink);
    final cache = GraphQLCache(store: InMemoryStore());

    return ValueNotifier(
      GraphQLClient(
        link: link,
        cache: cache,
      ),
    );
  }
}
