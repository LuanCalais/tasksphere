import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '@app/app.routes';
import { NavItem } from '@shared/types/navigation';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  navItems: NavItem[] = [];

  ngOnInit(): void {
    this.navItems = routes
      .filter((r) => r.path !== '**' && r.title)
      .map((route) => ({
        route,
        isOpen: false,
      }));
  }

  toggleDropdown(item: NavItem, event: Event): void {
    this.closeToggle();
    if (item.route.children?.length) {
      event.preventDefault();
      item.isOpen = !item.isOpen;
    }
  }

  closeToggle() {
    this.navItems.forEach((item) => (item.isOpen = false));
  }

  hasChildren(item: NavItem): boolean {
    return !!item.route.children?.length;
  }

  closeDropdown(item: NavItem): void {
    item.isOpen = false;
  }

  getRoute(routePath: string | undefined, childPath: string | undefined): string {
    return [routePath, childPath].filter(Boolean).join('/');
  }
}
