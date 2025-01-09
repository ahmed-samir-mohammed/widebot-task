import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../core/interface/user';
import { Role } from '../../../core/enum/role';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedUserFormComponent } from '../../../shared/components/user-form/user-form.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    SharedUserFormComponent,
  ],
  providers: [],
  template: `
    @if (initialData) {
    <app-user-form
      [title]="'Edit Profile'"
      [buttonText]="'Save'"
      [isAdmin]="user?.role === Role.Admin"
      [initialData]="initialData"
      (formSubmit)="onSubmit($event)"
    />
    }
  `,
  styles: [],
})
export class ProfileComponent {
  userService = inject(UsersService);
  authService = inject(AuthService);
  toaster = inject(ToastrService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  id!: string | number;
  isText: boolean = false;
  user: User | null = this.authService.getUser();
  initialData!: User;
  Role = Role;

  constructor() {
    this.id = this.route.snapshot.paramMap.get('id')! ?? this.user?.id;
  }

  ngOnInit() {
    this.userService
      .getCurrentUser(this.id)
      .subscribe((user) => (this.initialData = user));
  }

  togglePasswordVisibility() {
    this.isText = !this.isText;
  }

  onSubmit(data: User) {
    if (data) {
      const updatedUser = {
        id: this.user?.id,
        username: this.user?.username,
        password: data.password ?? this.user?.password,
        role: data.role ?? this.user?.role,
        details: {
          email: data.details.email,
          name: data.details.name,
        },
      };

      this.userService.updateUser(this.id, updatedUser).subscribe({
        next: () => this.toaster.success('Profile updated successfully'),
        error: () => this.toaster.error('Error updating profile'),
        complete: () => {
          if (this.route.snapshot.paramMap.get('id'))
            this.router.navigateByUrl('/admin/users-list');
        },
      });
    }
  }
}
