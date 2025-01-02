import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Role } from '../../../core/enum/role';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatCardModule, ReactiveFormsModule, FormsModule],
  standalone: true,
  template: `
    <div class="flex flex-col w-screen h-screen justify-center items-center">
      <h2 class="text-3xl mb-4">Login</h2>
      <form
        [formGroup]="loginForm"
        (ngSubmit)="submitForm()"
        class="flex flex-col w-[90vw] md:w-[60vw] lg:w-[40vw]"
      >
        <mat-form-field>
          <mat-label>Username</mat-label>
          <input formControlName="username" matInput required />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Password</mat-label>
          <input formControlName="password" matInput type="password" required />
        </mat-form-field>

        <button
          mat-raised-button
          class=" bg-slate-950 py-4 rounded-lg disabled:opacity-35 disabled:cursor-not-allowed"
          type="submit"
          [disabled]="!loginForm.valid"
        >
          Login
        </button>
      </form>
    </div>
  `,
  styles: ``,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (user) => {
          debugger;
          if (user.role === Role.Admin) {
            this.router.navigateByUrl('/admin');
          } else if (user.role === Role.User) {
            this.router.navigateByUrl('/profile/34');
          }
        },
      });
  }
}
