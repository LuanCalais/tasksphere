import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Project } from '@core/models/project';
import { ProjectsService } from '@features/projects/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-projects-list-page',
  standalone: true,
  templateUrl: './projects-list.page.html',
  styleUrl: './projects-list.page.scss',
  imports: [CommonModule, HeaderComponent, RouterLink],
})
export class ProjectsListPage implements OnInit {
  projects: Project[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private projectsService: ProjectsService, public nav: NavigationService) {}

  ngOnInit(): void {
    this.projectsService
      .getProjects()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (projects) => {
          this.projects = projects;
        },
        error: (error) => {
          console.error('Error fetching projects:', error);
          this.errorMessage = 'Erro ao carregar projetos.';
        },
      });
  }
}
