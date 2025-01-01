import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatCardModule],
  standalone: true,
  template: `
    <div class="flex w-screen h-screen justify-center items-center">
      <form class="example-form" class="flex flex-col">
        <mat-form-field class="example-full-width">
          <mat-label>Username</mat-label>
          <input matInput />
        </mat-form-field>

        <mat-form-field class="example-full-width">
          <mat-label>Password</mat-label>
          <input matInput />
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class LoginComponent {}
