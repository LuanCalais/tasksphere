import 'package:flutter/material.dart';
import 'package:tasksphere_monitor/theme/app_colors.dart';

class StatusDefinition {
  final String label;
  final String value;
  final Color color;

  const StatusDefinition({
    required this.label,
    required this.value,
    required this.color,
  });
}

enum TaskStatus { TODO, IN_PROGRESS, DONE }

enum ProjectStatus { TODO, IN_PROGRESS, CLOSE, DONE }

TaskStatus? taskStatusFromString(String? s) {
  if (s == null) return null;

  switch (s) {
    case 'TODO':
      return TaskStatus.TODO;
    case 'IN_PROGRESS':
      return TaskStatus.IN_PROGRESS;
    case 'DONE':
      return TaskStatus.DONE;
    default:
      return null;
  }
}

ProjectStatus? projectStatusFromString(String? s) {
  if (s == null) return null;

  switch (s) {
    case 'TODO':
      return ProjectStatus.TODO;
    case 'IN_PROGRESS':
      return ProjectStatus.IN_PROGRESS;
    case 'CLOSE':
      return ProjectStatus.CLOSE;
    case 'DONE':
      return ProjectStatus.DONE;
    default:
      return null;
  }
}

const Map<TaskStatus, StatusDefinition> TASK_STATUS_DEFINITIONS = {
  TaskStatus.TODO: StatusDefinition(
    label: 'Não iniciado',
    value: 'TODO',
    color: AppColors.waiting,
  ),
  TaskStatus.IN_PROGRESS: StatusDefinition(
    label: 'Em progresso',
    value: 'IN_PROGRESS',
    color: AppColors.information,
  ),
  TaskStatus.DONE: StatusDefinition(
    label: 'Concluído',
    value: 'DONE',
    color: AppColors.success,
  )
};

const Map<ProjectStatus, StatusDefinition> PROJECT_STATUS_DEFINITIONS = {
  ProjectStatus.TODO: StatusDefinition(
    label: 'Não iniciado',
    value: 'TODO',
    color: AppColors.waiting,
  ),
  ProjectStatus.IN_PROGRESS: StatusDefinition(
    label: 'Em progresso',
    value: 'IN_PROGRESS',
    color: AppColors.information,
  ),
  ProjectStatus.CLOSE: StatusDefinition(
    label: 'Encerrado',
    value: 'CLOSE',
    color: AppColors.error,
  ),
  ProjectStatus.DONE: StatusDefinition(
    label: 'Concluído',
    value: 'DONE',
    color: AppColors.success,
  )
};

StatusDefinition? taskStatusDefinitionFromValue(String? value) {
  if (value == null) return null;
  final status = taskStatusFromString(value);
  return TASK_STATUS_DEFINITIONS[status];
}

StatusDefinition? projectStatusDefinitionFromValue(String? value) {
  if (value == null) return null;
  return PROJECT_STATUS_DEFINITIONS[value as ProjectStatus];
}
