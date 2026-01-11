import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ProjectsService } from '../../services';
import { Project } from '@core/models/project';
import { UserSelectComponent } from '@features/users/components/user-select/user-select.component';
import { UsersService } from '@features/users/services';
import { User } from '@core/models/user';
import { UserOption } from '@core/types/user';

@Component({
  selector: 'app-project-create-page',
  standalone: true,
  templateUrl: './project-create.page.html',
  styleUrl: './project-create.page.scss',
  imports: [CommonModule, HeaderComponent, RouterLink, ReactiveFormsModule, UserSelectComponent],
})
export class ProjectCreatePage implements OnInit {
  submitting: boolean = false;
  errorMessage: string | null = null;
  form;
  loadingUsers: boolean = false;
  users: UserOption[] = [];

  constructor(
    public nav: NavigationService,
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private usersService: UsersService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      ownerId: [null as number | null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.loadingUsers = true;

    this.usersService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users
          .map((u) => ({
            id: u.id!,
            name: u.name,
            email: u.email,
            avatarUrl: u.profilePictureUrl ?? null,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        if (!this.form.value.ownerId && this.users.length > 0) {
          this.form.patchValue({ ownerId: Number(this.users[0].id) });
        }

        this.loadingUsers = false;
      },

      error: (err) => {
        console.error('Error loading users:', err);
        this.loadingUsers = false;
        this.errorMessage = 'Erro ao carregar usuários.';
      },
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
