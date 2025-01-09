import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Role } from '../../../core/enum/role';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: ` <nav
    class=" bg-slate-700 text-white p-4 flex justify-between items-center"
  >
    <div class="flex items-center justify-between w-full">
      <a
        routerLink="/"
        class="text-lg font-bold hover:text-gray-300 cursor-pointer"
        >Home</a
      >
      <div class="flex gap-4 items-center">
        @if (userRole === Role.Admin) {
        <a routerLink="/admin/" class="hover:text-gray-300 cursor-pointer"
          >Dashboard</a
        >
        <a
          routerLink="/admin/users-list"
          class="hover:text-gray-300 cursor-pointer"
          >Users List</a
        >
        }
        <button
          (click)="logout()"
          class="px-4 py-3 rounded  hover:bg-blue-700 transition-all duration-300"
        >
          <img src="/log-out.svg" class=" w-5" />
        </button>
      </div>
    </div>
  </nav>`,
  styles: ``,
})
export class NavbarComponent {
  userRole: number | undefined = undefined;
  Role = Role;
  constructor(private authService: AuthService, private router: Router) {
    this.userRole = this.authService.getUser()?.role;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
