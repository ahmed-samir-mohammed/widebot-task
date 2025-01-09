import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <img src="/unauthorized.svg" />
      <p class="text-3xl mt-10">Unauthorized Access</p>
      <a class='bg-blue-700 text-wrap px-8 py-3 rounded-lg mt-4 shadow-md flex cursor-pointer' routerLink="/login">Login</a>
    </div>
  `,
  styles: ``,
})
export class UnauthorizedComponent {}
