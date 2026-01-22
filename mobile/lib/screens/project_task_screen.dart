import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:tasksphere_monitor/models/task.dart';
import 'package:tasksphere_monitor/services/graphql_service.dart';

class ProjectTaskScreen extends StatefulWidget {
  final String projectId;
  final String projectName;

  const ProjectTaskScreen(
      {required this.projectId, required this.projectName, Key? key})
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

            return ListView.separated(
                itemBuilder: (context, index) {
                  final t = tasks[index];
                  return ListTile(
                    title: Text(t.title ?? ''),
                  );
                },
                separatorBuilder: (_, __) => Divider(),
                itemCount: tasks.length);
          },
        ));
  }
}
