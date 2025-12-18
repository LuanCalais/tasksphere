import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ProjectsService } from '../../services';
import { Project } from '@core/models/project';

@Component({
  selector: 'app-project-create-page',
  standalone: true,
  templateUrl: './project-create.page.html',
  styleUrl: './project-create.page.scss',
  imports: [CommonModule, HeaderComponent, RouterLink, ReactiveFormsModule],
})
export class ProjectCreatePage {
  submitting = false;
  errorMessage: string | null = null;
  form;

  constructor(
    public nav: NavigationService,
    private fb: FormBuilder,
    private projectsService: ProjectsService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      ownerId: [1, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid || this.submitting) return;

    this.submitting = true;
    this.errorMessage = null;

    const { name, description, ownerId } = this.form.value;

    this.projectsService
      .createProject({
        name: name!,
        description: description || undefined,
        ownerId: Number(ownerId),
      })
      .subscribe({
        next: (project: Project) => {
          console.log('Project created successfully', project);
          this.submitting = false;
          this.nav.goToRoute('projects');
        },
        error: (err) => {
          console.error('Error creating project:', err);
          this.submitting = false;
        },
      });
  }
}
