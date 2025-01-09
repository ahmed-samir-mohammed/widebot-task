import { UsersService } from './../../../core/services/users.service';
import { Component, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../../core/interface/user';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { finalize, Observable, switchMap } from 'rxjs';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { TabelComponent } from './tabel/tabel.component';
import { ToastrService } from 'ngx-toastr';
import { SharedDialogComponent } from '../../../shared/components/shared-dialog/shared-dialog.component';
import { SharedUserFormComponent } from '../../../shared/components/user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    TabelComponent,
    SharedDialogComponent,
    SharedUserFormComponent,
  ],
  template: `
    <div class="p-6">
      @if (isModalOpen) {
      <app-shared-dialog [title]="'Add User'" (closeModal)="toggleModal()">
        <app-user-form
          [buttonText]="'Add User'"
          (formSubmit)="submitForm($event)"
          [isAdmin]="true"
          [isNew]="true"
        />
      </app-shared-dialog>
      }
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">User List</h2>
        <button
          class="bg-blue-600 text-white p-2 rounded flex justify-center items-center hover:bg-blue-700
          "
          (click)="toggleModal()"
        >
          <mat-icon class="mat-18">person_add</mat-icon>
        </button>
      </div>
      <app-tabel />
    </div>
  `,
  styles: [
    `
      ::ng-deep svg {
        fill: #fff !important;
      }
      ::ng-deep .mat-mdc-select,
      ::ng-deep .mat-mdc-row {
        @apply !text-white;
      }
      ::ng-deep .mat-mdc-dialog-surface {
        @apply !bg-slate-700;
      }
    `,
  ],
})
export class UserListComponent {
  usersService = inject(UsersService);
  dialog = inject(MatDialog);
  updateTable!: boolean;
  toastr = inject(ToastrService);
  isModalOpen = false;

  private addUser(user: User): Observable<User> {
    return this.usersService.addUser(user);
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  submitForm(data: User) {
    const user: User = {
      ...data,
      username: data.details.email.split('@')[0],
      id: Math.floor(Math.random() * 1000000).toString(),
    };

    this.addUser(user).pipe(
      finalize(() => this.toggleModal())
    ).subscribe({
      next: () => this.toastr.success('User added successfully'),
      error: () => this.toastr.error('Failed to add user'),
    });
  }
}
