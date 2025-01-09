import { Component, inject, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../../../core/interface/user';
import { SharedDialogComponent } from '../../../../shared/components/shared-dialog/shared-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize, Observable, switchMap } from 'rxjs';
import { UsersService } from '../../../../core/services/users.service';
import { Role } from '../../../../core/enum/role';

@Component({
  selector: 'app-tabel',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    SharedDialogComponent,
  ],
  template: `
    <div class="mat-elevation-z8 rounded-lg overflow-hidden">
      <table mat-table [dataSource]="dataSource" class="!bg-slate-800">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef class="text-white">ID</th>
          <td mat-cell *matCellDef="let element">{{ element.id }}</td>
        </ng-container>

        <ng-container matColumnDef="username">
          <th mat-header-cell *matHeaderCellDef class="text-white">Username</th>
          <td mat-cell *matCellDef="let element">{{ element.username }}</td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef class="text-white">Name</th>
          <td mat-cell *matCellDef="let element">
            {{ element.details.name }}
          </td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef class="text-white">Email</th>
          <td mat-cell *matCellDef="let element">
            {{ element.details.email }}
          </td>
        </ng-container>

        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef class="text-white">Role</th>
          <td mat-cell *matCellDef="let element">
            {{ element.role == Role.Admin ? 'Admin' : 'User' }}
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef class="text-white">Actions</th>
          <td mat-cell *matCellDef="let element">
            <button
              mat-icon-button
              type="button"
              (click)="viewProfile(element.id)"
            >
              <mat-icon class="text-blue-400">visibility</mat-icon>
            </button>
            <button
              mat-icon-button
              type="button"
              (click)="toggleModal(element.id)"
            >
              <mat-icon class="text-red-400">delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
        aria-label="Select page of periodic elements"
        class="!bg-slate-800 !text-white border-t border-slate-500"
      >
      </mat-paginator>
    </div>
    @if (isModalOpen) {
    <app-shared-dialog [title]="'Delete User'" (closeModal)="toggleModal()">
      <div class="p-4">
        <p class="text-lg text-white">
          Are you sure you want to delete this user?
        </p>
        <div class="mt-4 flex justify-end space-x-2">
          <button
            class="px-4 py-2 text-gray-300 rounded hover:bg-slate-600"
            (click)="toggleModal()"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            (click)="deleteUserConfirmed()"
          >
            Delete
          </button>
        </div>
      </div>
    </app-shared-dialog>
    }
  `,
  styles: ``,
})
export class TabelComponent {
  dialog = inject(MatDialog);
  router = inject(Router);
  usersService = inject(UsersService);
  Role = Role;
  displayedColumns: string[] = [
    'id',
    'username',
    'name',
    'email',
    'role',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>([]);
  @Input() updateTable = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isModalOpen = false;
  selctedUserId!: number | string | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleModal(id?: string | number) {
    this.selctedUserId = id;
    this.isModalOpen = !this.isModalOpen;
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.users$.subscribe(
      (users) => (this.dataSource.data = users)
    );
  }

  private deleteUser(id: number | string): Observable<User> {
    return this.usersService.deleteUser(id);
  }

  viewProfile(id: number | string) {
    this.router.navigate([`/admin/userprofile/${id}`]);
  }

  deleteUserConfirmed() {
    if (this.selctedUserId)
      this.deleteUser(this.selctedUserId)
        .pipe(finalize(() => this.toggleModal()))
        .subscribe({
          next: (res) => console.log(res),
        });
  }
}
