import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  }
];

