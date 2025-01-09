import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../core/interface/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  template: `
    <div
      class="p-6 bg-slate-800 shadow rounded-md {{
        isNew ? 'w-full' : 'max-w-md'
      }} mx-auto"
    >
      @if (!isNew) {
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">{{ title }}</h2>
      </div>
      }
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div formGroupName="details">
          <mat-form-field appearance="fill" class="w-full">
            <mat-label>Name</mat-label>
            <input
              matInput
              [required]="isNew"
              formControlName="name"
              type="text"
            />
          </mat-form-field>
          <mat-form-field appearance="fill" class="w-full">
            <mat-label>Email</mat-label>
            <input
              matInput
              [required]="isNew"
              formControlName="email"
              type="email"
            />
          </mat-form-field>
        </div>
        @if (isAdmin) {
        <mat-form-field appearance="fill" class="w-full">
          <mat-label>Role</mat-label>
          <mat-select formControlName="role" [required]="isNew">
            <mat-option [value]="1">Admin</mat-option>
            <mat-option [value]="2">User</mat-option>
          </mat-select>
        </mat-form-field>
        }
        <mat-form-field appearance="fill" class="w-full">
          <mat-label>Password</mat-label>
          <input
            matInput
            [required]="isNew"
            [type]="isPasswordHidden ? 'password' : 'text'"
            formControlName="password"
          />
          <button
            mat-icon-button
            matSuffix
            (click)="togglePasswordVisibility()"
            [attr.aria-label]="
              isPasswordHidden ? 'Show password' : 'Hide password'
            "
            [attr.aria-pressed]="!isPasswordHidden"
            type="button"
          >
            <mat-icon>{{
              isPasswordHidden ? 'visibility' : 'visibility_off'
            }}</mat-icon>
          </button>
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="!userForm.valid"
          class="w-full !py-4 !bg-blue-600 !text-white flex items-center justify-center !h-12 !rounded-lg disabled:opacity-35 disabled:cursor-not-allowed"
        >
          {{ buttonText }}
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      ::ng-deep .mdc-text-field {
        @apply !px-4;
      }
    `,
  ],
})
export class SharedUserFormComponent {
  @Input() title: string = 'Form';
  @Input() buttonText: string = 'Submit';
  @Input() isAdmin: boolean = false;
  @Input() initialData!: User;
  @Input() isNew: boolean = false;
  @Output() formSubmit = new EventEmitter<any>();
  private fb = inject(FormBuilder);

  userForm!: FormGroup;
  isPasswordHidden = true;

  constructor() {
    this.initializeForm();
  }

  ngOnInit() {
    if (this.initialData) {
      this.userForm.patchValue({
        details: {
          email: this.initialData.details.email,
          name: this.initialData.details.name,
        },
        password: this.initialData.password,
        role: this.initialData.role,
      });
      if (!this.isAdmin) this.userForm.get('role')?.disable();
    }
  }

  private initializeForm() {
    if (this.isNew) {
      this.userForm = this.fb.group({
        details: this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
        }),
        role: ['', Validators.required],
        password: ['', Validators.required],
      });
    } else {
      this.userForm = this.fb.group({
        details: this.fb.group({
          name: [''],
          email: ['', Validators.email],
        }),
        role: [''],
        password: [''],
      });
    }
  }

  togglePasswordVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  onSubmit() {
    if (this.userForm.valid) this.formSubmit.emit(this.userForm.value);
  }
}
