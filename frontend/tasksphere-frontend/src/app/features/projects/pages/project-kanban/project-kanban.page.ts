import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Project } from '@core/models/project';
import { TaskStatus } from '@core/models/task/enums';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '@features/projects/services';
import { Task } from '@core/models/task';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ListCardComponent } from '@shared/components/card/list-card.component';
import { AVATAR_DEFAULT_IMAGE, TASK_STATUS_DEFINITION } from '@shared/constants';
import { StatusDefinition } from '@shared/types/kanban';

@Component({
  selector: 'project-kanban-page',
  standalone: true,
  templateUrl: './project-kanban.page.html',
  styleUrls: ['./project-kanban.page.scss'],
  imports: [CommonModule, DragDropModule, HeaderComponent, ListCardComponent],
})
export class ProjectKanbanPage implements OnInit {
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
    private cdr: ChangeDetectorRef
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

  async drop(event: CdkDragDrop<any[]>, targetStatus: TaskStatus) {}

  async advanceTaskStatus(task: any) {}

  getLabelForStatus(status: TaskStatus): StatusDefinition {
    return TASK_STATUS_DEFINITION[status];
  }
}
