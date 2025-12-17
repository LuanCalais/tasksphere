import { Routes } from '@angular/router';
import { HomePage } from '@core/pages/home-page/home.page';
import { ProjectsListPage } from './features/projects/pages/projects-list/projects-list.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'projects',
    component: ProjectsListPage,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
