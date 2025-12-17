import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-project-create-page',
  standalone: true,
  templateUrl: './project-create.page.html',
  styleUrl: './project-create.page.scss',
  imports: [CommonModule, HeaderComponent, RouterLink, RouterLinkActive],
})
export class ProjectCreatePage {
  constructor(public nav: NavigationService) {}
}
