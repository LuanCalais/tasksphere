enum TaskStatus { TODO, IN_PROGRESS, DONE }

class Task {
  final int id;
  final String title;
  final TaskStatus status;
  final String color;
  final String? dueDate;
  final Map<String, dynamic>? assignee;

  Task({
    required this.id,
    required this.title,
    required this.status,
    required this.color,
    this.dueDate,
    this.assignee
  });

  factory Task.fromJson(Map<String, dynamic> json) {
    TaskStatus parseStatus(String s) {
      switch (s) {
        case 'IN_PROGRESS': return TaskStatus.IN_PROGRESS;
        case 'DONE': return TaskStatus.DONE;
        default: return TaskStatus.TODO;
      }
    }

    return Task(
      id: int.parse(json['id'].toString()),
      title: json['title'] ?? '',
      status: parseStatus(json['status'] ?? 'TODO'),
      color: json['color'] ?? '#FFFFFF',
      dueDate: json['dueDate'],
      assignee: json['assignee'],
    );
  }
}
