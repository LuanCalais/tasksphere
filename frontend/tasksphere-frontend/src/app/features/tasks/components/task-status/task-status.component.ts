import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TASK_STATUS_DEFINITION } from '@shared/constants';
import { TaskStatus } from '@core/models/task/enums';

@Component({
  selector: 'task-status',
  standalone: true,
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss',
  imports: [CommonModule],
})
export class TaskStatusComponent {
  status = input<TaskStatus>(TaskStatus.TODO);
  TASK_STATUS_DEFINITION = TASK_STATUS_DEFINITION;
}
