import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { SkeletonComponent } from '@app/shared/components/skeleton/skeleton.component';
import { CardComponent } from '@features/projects/components/card/card.component';
import { User } from '@app/core/models/user';
import { UsersService } from '@features/users/services';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  templateUrl: './users-list.page.html',
  styleUrl: './users-list.page.scss',
  imports: [CommonModule, HeaderComponent, RouterLink, SkeletonComponent, CardComponent],
})
export class UsersListPage implements OnInit {
  users: User[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private usersService: UsersService,
    public nav: NavigationService,
    private cdr: ChangeDetectorRef
  ) {}

  canShowContent(): boolean {
    return !this.loading && !this.errorMessage;
  }

  // TODO: Method to delete a user (currently commented out)
  // deleteUser(id: number | undefined): void {
  //   if (!id) return;
  //   this.loading = true;
  //   this.usersService.deleteUser(id as number).subscribe({
  //     next: () => {
  //       this.loading = false;
  //     },
  //     error: () => {
  //       this.loading = false;
  //     },
  //   });
  // }

  ngOnInit(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Erro ao carregar usuários.';
        this.cdr.detectChanges();
      },
    });
  }
}
