import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="flex flex-col h-screen">
      <app-navbar></app-navbar>
      <main class="p-[20px] flex-[1]">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [],
})
export class LayoutComponent {}
