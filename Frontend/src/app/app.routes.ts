import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // {
  //   path: 'admin',
  //   canActivate: [AuthGuard, RoleGuard],
  //   loadChildren: () =>
  //     import('./features/admin/admin.routes').then((m) => m.routes),
  // },
  {
    path: 'user',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user/profile/profile.component').then((c) =>c.ProfileComponent),
  },
  { path: '**', redirectTo: 'login' },
];
