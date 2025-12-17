import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarouselComponent } from '@shared/components/carousel/carousel.component';
import { Project } from '@core/models/project';
import { ProjectsService } from '@features/projects/services';
import { HeaderComponent } from '@shared/components/header/header.component';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HOME_PAGE_BANNERS } from '@app/shared/constants';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  imports: [RouterLink, RouterLinkActive, HeaderComponent, CarouselComponent, CommonModule],
})
export class HomePage implements OnInit {
  
  projects: Project[] = [];
  loading = true;
  errorMessage: string | null = null;
  CAROUSEL_HOME_PAGE_BANNERS = HOME_PAGE_BANNERS;

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
