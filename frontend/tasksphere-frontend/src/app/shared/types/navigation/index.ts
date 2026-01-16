import { Route } from '@angular/router';

export interface RouteWithMenu extends Route {
  hideInMenu?: boolean;
}

export interface NavItem {
  route: RouteWithMenu;
  isOpen: boolean;
}
