import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:tasksphere_monitor/models/task.dart';
import 'package:tasksphere_monitor/services/graphql_service.dart';
import 'package:tasksphere_monitor/theme/app_colors.dart';
import 'package:tasksphere_monitor/widgets/app_status.dart';

class ProjectTaskScreen extends StatefulWidget {
  final String projectId;
  final String projectName;
  final String projectDescription;

  const ProjectTaskScreen(
      {required this.projectId,
      required this.projectName,
      required this.projectDescription,
      Key? key})
      : super(key: key);

  @override
  _ProjectTaskScreenState createState() => _ProjectTaskScreenState();
}

class _ProjectTaskScreenState extends State<ProjectTaskScreen> {
  late GraphqlService svc;
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    svc = GraphqlService(GraphQLProvider.of(context).value);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Row(
          children: [
            Icon(Icons.workspaces_outlined),
            SizedBox(width: 6),
            Expanded(
              child: Text(
                widget.projectName,
                overflow: TextOverflow.ellipsis,
                maxLines: 1,
              ),
            )
          ],
        )),
        body: FutureBuilder<List<Task>>(
          future: svc.fetchTasksByProject(widget.projectId),
          builder: (context, snap) {
            if (snap.connectionState != ConnectionState.done)
              return const Center(child: CircularProgressIndicator());

            if (snap.hasError)
              return Center(
                child: Text("Erro: ${snap.error}"),
              );
            final tasks = snap.data ?? <Task>[];
            if (tasks.isEmpty)
              return Center(
                child: Text("No tasks found"),
              );

            final headerRow = Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Descrição do projeto',
                      style: TextStyle(
                        color: AppColors.information,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                    SizedBox(
                      height: 6,
                    ),
                    Text(
                      widget.projectDescription,
                      softWrap: true,
                    )
                  ],
                ));

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                headerRow,
                Divider(
                  height: 1,
                ),
                Expanded(
                    child: ListView.separated(
                        itemBuilder: (context, index) {
                          final t = tasks[index];
                          return ListTile(
                            title: Text(t.title),
                            subtitle: AppStatus(
                                statusValue: t.status.toString(),
                                compact: true),
                            trailing: Container(
                              width: 16,
                              height: 16,
                              decoration: BoxDecoration(
                                color: Color(int.parse(
                                    t.color.replaceFirst("#", "0xff"))),
                                shape: BoxShape.rectangle,
                              ),
                            ),
                          );
                        },
                        separatorBuilder: (_, __) => Divider(),
                        itemCount: tasks.length))
              ],
            );
          },
        ));
  }
}
