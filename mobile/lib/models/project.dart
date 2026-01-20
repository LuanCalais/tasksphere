import 'package:tasksphere_monitor/models/task.dart';

enum ProjectStatus { TODO, IN_PROGRESS, DONE, CLOSE }

class Project {
  final int id;
  final String name;
  final String? description;
  final ProjectStatus status;
  final List<Task> tasks;
  final Map<String, dynamic>? owner;

  Project({
    required this.id,
    required this.name,
    this.description,
    required this.status,
    required this.tasks,
    this.owner,
  });

  factory Project.fromJson(Map<String, dynamic> json) {
    ProjectStatus parseStatus(String s) {
      switch (s) {
        case 'IN_PROGRESS':
          return ProjectStatus.IN_PROGRESS;
        case 'DONE':
          return ProjectStatus.DONE;
        case 'CLOSE':
          return ProjectStatus.CLOSE;
        default:
          return ProjectStatus.TODO;
      }
    }

    final rawTasks = (json['tasks'] as List?) ?? [];

    return Project(
      id: int.parse(json['id'].toString()),
      name: json['name'] ?? '',
      description: json['description'],
      status: parseStatus(json['status'] ?? 'TODO'),
      tasks: rawTasks
          .map((t) => Task.fromJson(Map<String, dynamic>.from(t)))
          .toList(),
      owner: json['owner'] as Map<String, dynamic>?,
    );
  }
}
