import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Project } from '@core/models/project';
import { TaskStatus } from '@core/models/task/enums';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '@features/projects/services';
import { Task } from '@core/models/task';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ListCardComponent } from '@shared/components/card/list-card.component';
import { AVATAR_DEFAULT_IMAGE, TASK_STATUS_DEFINITION } from '@shared/constants';
import { StatusDefinition } from '@shared/types/kanban';
import { TasksService } from '@features/tasks/services';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'project-kanban-page',
  standalone: true,
  templateUrl: './project-kanban.page.html',
  styleUrls: ['./project-kanban.page.scss'],
  imports: [CommonModule, DragDropModule, HeaderComponent, ListCardComponent],
})
export class ProjectKanbanPage implements OnInit {
  TaskStatus = TaskStatus;
  projectId: string = '';
  project: Project | null = null;
  loading: boolean = false;

  columns: Record<string, Task[]> = {
    [TaskStatus.TODO]: [],
    [TaskStatus.IN_PROGRESS]: [],
    [TaskStatus.DONE]: [],
  };

  columnsOrder: TaskStatus[] = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

  readonly avatarDefaultPath = AVATAR_DEFAULT_IMAGE.src;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private tasksService: TasksService,
    private cdr: ChangeDetectorRef,
    public nav: NavigationService,
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProject();
  }

  loadProject(): void {
    this.loading = true;
    this.projectsService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.loading = false;
        this.rebuildColumns();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading project kanban', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  rebuildColumns(): void {
    if (!this.project) return;
    this.columns = {
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.DONE]: [],
    };

    (this.project?.tasks || []).forEach((task) => {
      if (!this.columns[task.status]) this.columns[task.status] = [];
      this.columns[task.status].push(task);
    });
  }

  async drop(event: CdkDragDrop<any[]>, targetStatus: TaskStatus) {
    const prevContainer = event.previousContainer;
    const currContainer = event.container;

    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(currContainer.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        prevContainer.data,
        currContainer.data,
        event.previousIndex,
        event.currentIndex,
      );

      const moved = currContainer.data[event.currentIndex];

      try {
        await this.tasksService.updateTaskStatus(moved.id, targetStatus).toPromise();
      } catch (e) {
        console.error(e);
        this.loadProject();
      }
    }
  }

  async advanceTaskStatus(task: any) {
    const order = this.columnsOrder;
    const idx = order.indexOf(task.status);
    const next = idx < order.length - 1 ? order[idx + 1] : order[idx];
    if (next === task.status) return;

    try {
      await this.tasksService.updateTaskStatus(task.id, next).toPromise();
    } catch (e) {
      console.error(e);
      this.loadProject();
    }
  }

  getLabelForStatus(status: TaskStatus): StatusDefinition {
    return TASK_STATUS_DEFINITION[status];
  }
}
