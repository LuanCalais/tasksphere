import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '@app/app.routes';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  appRoutes: Route[] = routes;
}
