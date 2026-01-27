import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:tasksphere_monitor/models/user.dart';
import 'package:tasksphere_monitor/services/graphql_service.dart';
import 'package:tasksphere_monitor/widgets/app_drawer.dart';

class UsersListScreen extends StatefulWidget {
  @override
  _UsersListScreenState createState() => _UsersListScreenState();
}

class _UsersListScreenState extends State<UsersListScreen> {
  late GraphqlService svc;
  late Future<List<User>> _usersFuture;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final client = GraphQLProvider.of(context).value;
    svc = GraphqlService(client);
    _usersFuture = svc.fetchUsers();
  }

  Future<void> _refreshUsers() async {
    setState(() {
      _usersFuture = svc.fetchUsers();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Icon(Icons.people_outline_rounded, size: 24),
            SizedBox(
              width: 6,
            ),
            Text('Usuários')
          ],
        ),
      ),
      drawer: const AppDrawer(),
      body: RefreshIndicator(
        onRefresh: _refreshUsers,
        color: Theme.of(context).primaryColor,
        child: FutureBuilder<List<User>>(
            future: _usersFuture,
            builder: (context, snap) {
              if (snap.connectionState != ConnectionState.done) {
                return const Center(child: CircularProgressIndicator());
              }

              final users = snap.data ?? [];

              if (snap.hasError)
                return Center(child: Text('Erro: ${snap.error}'));

              return ListView.separated(
                itemCount: users.length,
                separatorBuilder: (_, __) => const Divider(),
                itemBuilder: (context, i) {
                  final u = users[i];

                  return ListTile(
                      leading: CircleAvatar(
                        backgroundImage: u.profilePictureUrl != null
                            ? NetworkImage(u.profilePictureUrl!)
                            : null,
                        child: u.profilePictureUrl == null
                            ? Text(u.name[0])
                            : null,
                      ),
                      title: Text(u.name),
                      subtitle: Text(u.email),
                      onTap: () => Navigator.pushNamed(context, '/'));
                },
              );
            }),
      ),
    );
  }
}
