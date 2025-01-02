import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/admin/admin.routes').then((m) => m.routes),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/user/user.routes').then((m) => m.routes),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
