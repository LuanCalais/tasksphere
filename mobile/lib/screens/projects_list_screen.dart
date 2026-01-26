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
      body: FutureBuilder<List<Project>>(
        future: svc.fetchProjects(),
        builder: (context, snap) {
          return ListView.separated(
              itemCount: snap.data?.length ?? 0,
              separatorBuilder: (_, __) => const Divider(),
              itemBuilder: (context, i) {
                final project = snap.data?[i];

                final imageUrl = getImageProfile(project?.owner);
                return ListTile(
                  title: Text(project?.name ?? 'Sem nome'),
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
                                ? Text(project?.owner?['name']?[0] ?? '')
                                : null),
                        SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            project?.description ?? 'Sem descrição',
                            overflow: TextOverflow.ellipsis,
                            maxLines: 2,
                          ),
                        ),
                      ],
                    ),
                  ),
                  trailing: Text('${project?.tasks.length} tasks'),
                  onTap: () => Navigator.pushNamed(context, '/projects_tasks',
                      arguments: {
                        'projectId': project?.id.toString(),
                        'projectName': project?.name,
                        'projectDescription': project?.description
                      }),
                );
              });
        },
      ),
    );
  }
}
