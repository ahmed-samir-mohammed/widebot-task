import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'users-list',
    loadComponent: () =>
      import('./user-list/user-list.component').then(
        (c) => c.UserListComponent
      ),
  },
  {
    path: 'userprofile/:id',
    loadComponent: () =>
      import('../user/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
];
