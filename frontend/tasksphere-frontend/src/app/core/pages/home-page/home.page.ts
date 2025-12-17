import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Project } from '@core/models/project';
import { ProjectsService } from '@features/projects/services';
import { HeaderComponent } from '@shared/components/header/header.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  imports: [RouterLink, RouterLinkActive, HeaderComponent],
})
export class HomePage implements OnInit{

  projects: Project[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private projectsService: ProjectsService) {}

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
