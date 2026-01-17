import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '@features/projects/services';
import { Project } from '@core/models/project';
import { ProjectStatus } from '@core/models/project/enums';
import { HeaderComponent } from '@shared/components/header/header.component';
import { TaskStatus } from '@core/models/task/enums';
import { AVATAR_DEFAULT_IMAGE, PROJECT_STATUS_DEFINITION } from '@shared/constants';
import { StatusDefinition } from '@shared/types/kanban';
import { ListCardComponent } from '@shared/components/card/list-card.component';
import { NavigationService } from '@app/core/services/navigation.service';

@Component({
  selector: 'kanban-board-page',
  standalone: true,
  templateUrl: './kanban-board.page.html',
  styleUrls: ['./kanban-board.page.scss'],
  imports: [CommonModule, HeaderComponent, ListCardComponent],
})
export class KanbanBoardPage implements OnInit {
  projects: Project[] = [];
  loading: boolean = false;
  columns: Record<string, Project[]> = {};
  columnsOrder: ProjectStatus[] = [
    ProjectStatus.TODO,
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.CLOSE,
    ProjectStatus.DONE,
  ];

  errorMessage: string | null = null;

  readonly avatarDefaultPath = AVATAR_DEFAULT_IMAGE.src;

  constructor(
    private projectsService: ProjectsService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.rebuildColumns();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading projects for kanban', err);
        this.errorMessage = 'Erro ao carregar projetos.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  rebuildColumns() {
    this.columns = {};
    this.columnsOrder.forEach((s) => (this.columns[s] = []));

    for (const project of this.projects) {
      const status = this.deriveProjectStatus(project);
      this.columns[status].push(project);
    }
  }

  getLabelForStatus(status: ProjectStatus): StatusDefinition {
    return PROJECT_STATUS_DEFINITION[status];
  }

  deriveProjectStatus(project: Project): ProjectStatus {
    const tasks = project.tasks || [];
    if (tasks.length === 0) return ProjectStatus.TODO;

    const allDone = tasks.every((t: any) => t.status === TaskStatus.DONE);
    if (allDone) return ProjectStatus.DONE;

    const anyInProgressOrDone = tasks.some(
      (t: any) => t.status === TaskStatus.IN_PROGRESS || t.status === TaskStatus.DONE
    );
    if (anyInProgressOrDone) return ProjectStatus.IN_PROGRESS;

    return ProjectStatus.TODO;
  }

  openProject(project: any) {
    this.router.navigate(['/kanban/project', project.id]);
  }
}
