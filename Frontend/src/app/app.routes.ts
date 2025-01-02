import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/user/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  { path: '**', redirectTo: 'login' },
];
