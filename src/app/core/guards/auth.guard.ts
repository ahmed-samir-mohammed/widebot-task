/**
 * AuthGuard is a route guard that checks if the user is logged in.
 * If the user is logged in, it allows the navigation to proceed.
 * If the user is not logged in, it redirects the user to the login page.
 *
 * @returns {boolean | Promise<boolean>} - Returns true if the user is logged in,
 * otherwise redirects to the login page and returns false.
 */

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn()
    ? true
    : router.navigate(['/login']).then(() => false);
};
