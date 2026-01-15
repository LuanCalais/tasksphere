import { Routes } from '@angular/router';
import { HomePage } from '@core/pages/home-page/home.page';
import { ProjectsListPage } from './features/projects/pages/projects-list/projects-list.page';
import { ProjectCreatePage } from './features/projects/pages/project-create/project-create.page';
import { UsersListPage } from './features/users/pages/users-list/users-list.page';
import { UserCreatePage } from './features/users/pages/users-create/users-create.page';
import { KanbanBoardPage } from './features/kanban/pages/kanban-board/kanban-board.page';

const customRoutes: Routes = [
  {
    path: '',
    title: 'Início',
    component: HomePage,
  },
  {
    path: 'projects',
    title: 'Projetos',
    children: [
      {
        path: '',
        component: ProjectsListPage,
      },
      {
        path: 'new',
        title: 'Criar Projeto',
        component: ProjectCreatePage,
      },
      {
        path: 'kanban',
        title: 'Kanban',
        component: KanbanBoardPage,
      },
    ],
  },

  {
    path: 'users',
    title: 'Usuários',
    children: [
      {
        path: '',
        component: UsersListPage,
      },
      {
        path: 'new',
        title: 'Criar Usuário',
        component: UserCreatePage,
      },
    ],
  },
];

export const routes: Routes = [
  ...customRoutes,
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
