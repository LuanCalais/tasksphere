import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ProjectsService } from '../../services';
import { Project } from '@core/models/project';
import { UserSelectComponent } from '@features/users/components/user-select/user-select.component';
import { UsersService } from '@features/users/services';
import { User } from '@core/models/user';
import { UserOption } from '@core/types/user';
import { ColorPickerDirective } from 'ngx-color-picker';
import { DEFAULT_COLORS } from '@shared/constants';
import { TaskFormValue } from '@core/types/task';
import { LucideAngularModule, X, Plus } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-create-page',
  standalone: true,
  templateUrl: './project-create.page.html',
  styleUrl: './project-create.page.scss',
  imports: [
    CommonModule,
    HeaderComponent,
    RouterLink,
    ReactiveFormsModule,
    UserSelectComponent,
    ColorPickerDirective,
    LucideAngularModule,
  ],
})
export class ProjectCreatePage implements OnInit {
  submitting: boolean = false;
  errorMessage: string | null = null;
  form;
  loadingUsers: boolean = false;
  users: UserOption[] = [];
  readonly XIcon = X;
  readonly PlusIcon = Plus;

  constructor(
    public nav: NavigationService,
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      ownerId: [null as number | null, [Validators.required]],
      tasks: this.fb.array([], [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.addTask();
  }

  get tasks(): FormArray {
    return this.form.get('tasks') as FormArray;
  }

  private getRandomColor(): string {
    const index = this.tasks.length % DEFAULT_COLORS.length;
    return DEFAULT_COLORS[index];
  }

  private createTaskFormGroup(initialColor?: number): FormGroup {
    const randomColor = initialColor || this.getRandomColor();
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      color: [randomColor, [Validators.required]],
      assigneeId: [null as number | null],
      dueDate: [null as string | null],
    });
  }

  addTask(): void {
    this.tasks.push(this.createTaskFormGroup());
  }

  removeTask(index: number): void {
    if (this.tasks.length > 1) {
      this.tasks.removeAt(index);
    }
  }

  getTaskFormGroup(index: number): FormGroup {
    return this.tasks.at(index) as FormGroup;
  }

  onColorChange(index: number, color: string): void {
    this.getTaskFormGroup(index).patchValue({ color });
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

  private validateTasks(): boolean {
    this.tasks.controls.forEach((control) => {
      control.markAllAsTouched();
    });

    const tasksWithoutAssignee = (this.tasks.value as TaskFormValue[]).filter(
      (task) => !task.assigneeId
    );

    if (tasksWithoutAssignee.length > 0) {
      this.toastr.error(
        `${tasksWithoutAssignee.length} task(s) sem responsável. Todas as tasks precisam ter um responsável.`
      );

      return false;
    }

    return true;
  }

  onSubmit() {
    if (this.form.invalid || !this.validateTasks() || this.submitting) {
      return;
    }

    this.submitting = true;
    this.errorMessage = null;

    const { name, description, ownerId, tasks } = this.form.value;

    const formattedTasks = (tasks as TaskFormValue[]).map((task) => ({
      title: task.title,
      color: task.color,
      assigneeId: task.assigneeId ? String(task.assigneeId) : null,
      dueDate: task.dueDate || null,
    }));

    this.projectsService
      .createProject({
        name: name!,
        description: description || undefined,
        ownerId: Number(ownerId),
        tasks: formattedTasks,
      })
      .subscribe({
        next: (project: Project) => {
          console.log('Project created successfully', project);
          this.submitting = false;
          this.nav.goToRoute('projects');
          this.toastr.success('Projeto criado corretamente');
        },
        error: (err) => {
          console.error('Error creating project:', err);
          this.submitting = false;
          this.toastr.error('Não foi possível criar o projeto, tente novamente mais tarde');
        },
      });
  }
}
