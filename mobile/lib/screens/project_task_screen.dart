import 'package:flutter/material.dart';

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
        body: const Text('Project Task Screen'));
  }
}
