import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role } from '../enum/role';

export const RoleGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.getUser()?.role === Role.Admin) {
    return true;
  } else {
    router.navigateByUrl('/unauthorized');
    return false;
  }
};
