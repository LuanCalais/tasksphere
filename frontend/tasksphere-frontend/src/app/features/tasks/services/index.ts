import { Injectable } from '@angular/core';
import { Task } from '@app/core/models/task';
import { TaskStatus } from '@app/core/models/task/enums';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { UPDATE_TASK_STATUS } from '../mutations';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private apollo: Apollo) {}

  updateTaskStatus(taskId: string, status: TaskStatus): Observable<Task> {
    return this.apollo.mutate<
      { updateTaskStatus: Task },
      { taskId: string; status: TaskStatus }
    >({
      mutation: UPDATE_TASK_STATUS,
      variables: { taskId, status },
    }).pipe(map(res => res.data!.updateTaskStatus));
  }
}
