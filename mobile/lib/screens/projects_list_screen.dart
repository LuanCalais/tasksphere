import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:tasksphere_monitor/models/project.dart';
import 'package:tasksphere_monitor/services/graphql_service.dart';
import 'package:tasksphere_monitor/widgets/app_drawer.dart';

class ProjectsListScreen extends StatefulWidget {
  @override
  _ProjectsListScreenState createState() => _ProjectsListScreenState();
}

class _ProjectsListScreenState extends State<ProjectsListScreen> {
  late GraphqlService svc;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final client = GraphQLProvider.of(context).value;
    svc = GraphqlService(client);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Projetos'),
      ),
      drawer: const AppDrawer(),
      body: FutureBuilder<List<Project>>(
        future: svc.fetchProjects(),
        builder: (context, snap) {
          return ListView.separated(
              itemCount: snap.data?.length ?? 0,
              separatorBuilder: (_, __) => const Divider(),
              itemBuilder: (context, i) {
                final project = snap.data?[i];
                debugPrint('ProjectsListScreen rebuild: ${project?.name}');
                return ListTile(
                  title: Text(project?.name ?? 'Sem nome'),
                  subtitle: Text(project?.description ?? 'Sem descrição'),
                  trailing: Text('${project?.tasks.length} tasks'),
                  onTap: () => Navigator.pushNamed(context, '/projects',
                      arguments: {
                        'projectId': project?.id.toString(),
                        'projectName': project?.name
                      }),
                );
              });
        },
      ),
    );
  }
}
