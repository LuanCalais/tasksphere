import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:tasksphere_monitor/models/project.dart';
import 'package:tasksphere_monitor/services/graphql_service.dart';
import 'package:tasksphere_monitor/utils/avatar_utils.dart';
import 'package:tasksphere_monitor/widgets/app_drawer.dart';

class ProjectsListScreen extends StatefulWidget {
  @override
  _ProjectsListScreenState createState() => _ProjectsListScreenState();
}

class _ProjectsListScreenState extends State<ProjectsListScreen> {
  late GraphqlService svc;
  late Future<List<Project>> _projectsFuture;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final client = GraphQLProvider.of(context).value;
    svc = GraphqlService(client);
    _projectsFuture = svc.fetchProjects();
  }

  Future<void> _refreshProjects() async {
    setState(() {
      _projectsFuture = svc.fetchProjects();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Row(
        children: [
          Icon(
            Icons.work_outline_rounded,
            size: 24,
          ),
          SizedBox(width: 6),
          Text('Projetos')
        ],
      )),
      drawer: const AppDrawer(),
      body: RefreshIndicator(
          onRefresh: _refreshProjects,
          color: Theme.of(context).primaryColor,
          child: FutureBuilder<List<Project>>(
            future: _projectsFuture,
            builder: (context, snap) {
              if (snap.connectionState != ConnectionState.done) {
                return const Center(child: CircularProgressIndicator());
              }

              final projects = snap.data ?? [];

              if (snap.hasError)
                return Center(
                  child: Text('Erro: ${snap.error}'),
                );

              return ListView.separated(
                  itemCount: projects.length,
                  separatorBuilder: (_, __) => const Divider(),
                  itemBuilder: (context, i) {
                    final project = projects[i];

                    final imageUrl = getImageProfile(project.owner);
                    return ListTile(
                      title: Text(project.name),
                      subtitle: Container(
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            CircleAvatar(
                                radius: 14,
                                backgroundImage: imageUrl.isNotEmpty
                                    ? NetworkImage(imageUrl)
                                    : null,
                                child: imageUrl.isEmpty
                                    ? Text(project.owner?['name']?[0] ?? '')
                                    : null),
                            SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                project.description ?? 'Sem descrição',
                                overflow: TextOverflow.ellipsis,
                                maxLines: 2,
                              ),
                            ),
                          ],
                        ),
                      ),
                      trailing: Text('${project.tasks.length} tasks'),
                      onTap: () => Navigator.pushNamed(
                          context, '/projects_tasks',
                          arguments: {
                            'projectId': project.id.toString(),
                            'projectName': project.name,
                            'projectDescription': project.description,
                            'projectOwner': project.owner,
                          }),
                    );
                  });
            },
          )),
    );
  }
}
