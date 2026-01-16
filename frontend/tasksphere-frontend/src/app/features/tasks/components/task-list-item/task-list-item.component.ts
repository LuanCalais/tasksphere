import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { User } from '@core/models/user';
import { AVATAR_DEFAULT_IMAGE } from '@shared/constants';
import { TaskStatus } from '@core/models/task/enums';
import { TaskStatusComponent } from '@features/tasks/components/task-status/task-status.component';

@Component({
  selector: 'task-list-item',
  standalone: true,
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss',
  imports: [CommonModule, TaskStatusComponent],
})
export class TaskListItemComponent {
  id = input<number | undefined>();
  title = input<string | undefined>('');
  color = input<string>('');
  status = input<TaskStatus>(TaskStatus.TODO);
  assignee = input<User | null>(null);

  readonly avatarDefaultPath = AVATAR_DEFAULT_IMAGE.src;
}
