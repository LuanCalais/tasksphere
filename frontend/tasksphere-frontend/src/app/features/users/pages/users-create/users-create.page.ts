import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { UsersService } from '@features/users/services';
import { User } from '@app/core/models/user';

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  templateUrl: './users-create.page.html',
  styleUrl: './users-create.page.scss',
  imports: [CommonModule, HeaderComponent, RouterLink, ReactiveFormsModule],
})
export class UserCreatePage {
  submitting = false;
  errorMessage: string | null = null;
  form;

  constructor(
    public nav: NavigationService,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      profilePicture: [''],
    });
  }

  onSubmit() {
    if (this.form.invalid || this.submitting) return;

    this.submitting = true;
    this.errorMessage = null;

    const { name, email, profilePicture } = this.form.value;

    this.usersService
      .createUser({
        name: name!,
        email: email!,
        profilePictureUrl: profilePicture || undefined,
      })
      .subscribe({
        next: (user: User) => {
          console.log('User created successfully', user);
          this.submitting = false;
          this.nav.goToRoute('users');
        },
        error: (err) => {
          console.error('Error creating user:', err);
          this.submitting = false;
        },
      });
  }
}
