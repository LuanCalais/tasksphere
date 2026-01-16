import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Project } from '@core/models/project';
import { ProjectsService } from '@features/projects/services';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';
import { CardComponent } from '@features/projects/components/card/card.component';
import { ToastrService } from 'ngx-toastr';
import { EmptyComponent } from '@shared/components/empty/empty.component';

@Component({
  selector: 'app-projects-list-page',
  standalone: true,
  templateUrl: './projects-list.page.html',
  styleUrl: './projects-list.page.scss',
  imports: [CommonModule, HeaderComponent, RouterLink, SkeletonComponent, CardComponent, EmptyComponent],
})
export class ProjectsListPage implements OnInit {
  projects: Project[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private projectsService: ProjectsService,
    public nav: NavigationService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  canShowContent(): boolean {
    return !this.loading && !this.errorMessage;
  }

  deleteProject(id: number | string | undefined): void {
    if (!id) return;
    this.loading = true;
    this.projectsService.deleteProject(id as number).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Projeto deletado com sucesso.');
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Erro ao deletar o projeto.');
      },
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.projectsService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
        this.errorMessage = 'Erro ao carregar projetos.';
        this.cdr.detectChanges();
      },
    });
  }
}
