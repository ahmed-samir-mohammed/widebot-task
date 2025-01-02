import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  template: `
    <div class="layout">
      <!-- <app-header></app-header> -->
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .content {
        display: flex;
        flex: 1;
      }
      main {
        flex: 1;
        padding: 20px;
      }
    `,
  ],
})
export class LayoutComponent {}
