import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:tasksphere_monitor/graphql/graphql_client.dart';
import 'package:tasksphere_monitor/screens/users_list_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initHiveForFlutter();

  final clientNotifier =
      await GraphQLConfig.initClient(isAndroidEmulator: false);

  runApp(MyApp(client: clientNotifier));
}

class MyApp extends StatelessWidget {
  final ValueNotifier<GraphQLClient> client;

  const MyApp({required this.client, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
      client: client,
      child: MaterialApp(
        title: 'TaskSphere Monitor',
        theme: ThemeData(primarySwatch: Colors.indigo),
        routes: {
          '/': (c) => UsersListScreen(),
        },
      ),
    );
  }
}
