import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { UsersService } from '@features/users/services';
import { User } from '@core/models/user';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-user-create-page',
  standalone: true,
  templateUrl: './users-create.page.html',
  styleUrl: './users-create.page.scss',
  imports: [CommonModule, HeaderComponent, RouterLink, ReactiveFormsModule, LucideAngularModule],
})
export class UserCreatePage {
  submitting = false;
  errorMessage: string | null = null;
  form;

  selectedFileName: string | null = null;
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;

  readonly XIcon = X;

  constructor(
    public nav: NavigationService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      profilePicture: [''],
    });
  }

  onFileSelected(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.form.patchValue({ profilePicture: this.selectedFileName });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.selectedFileName = null;
    this.imagePreviewUrl = null;
    this.form.patchValue({ profilePicture: '' });

    const input = document.getElementById('profile-picture') as HTMLInputElement;
    if (input) {
      input.type = 'text';
      input.type = 'file';
      input.value = '';
    }

    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.form.invalid || this.submitting) return;

    this.submitting = true;
    this.errorMessage = null;

    const { name, email } = this.form.value;

    this.usersService
      .createUser(
        {
          name: name!,
          email: email!,
        },
        this.selectedFile || undefined
      )
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
