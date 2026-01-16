import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Project } from '@app/core/models/project';
import { TaskStatus } from '@core/models/task/enums';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '@features/projects/services';

@Component({
  selector: 'project-kanban-page',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './project-kanban.page.html',
  styleUrls: ['./project-kanban.page.scss'],
})
export class ProjectKanbanPage implements OnInit {
  projectId: string = '';
  project: Project | null = null;
  loading: boolean = false;
  columnsOrder = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
  columns: Record<string, TaskStatus[]> = {
    [TaskStatus.TODO]: [],
    [TaskStatus.IN_PROGRESS]: [],
    [TaskStatus.DONE]: [],
  };

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
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading project kanban', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
