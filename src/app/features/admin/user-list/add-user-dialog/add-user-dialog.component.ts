import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedUserFormComponent } from "../../../../shared/components/user-form/user-form.component";
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../../core/interface/user';

@Component({
  selector: 'app-add-user-dialog',
  imports: [SharedUserFormComponent, MatIconModule],
  template: `
    <app-user-form
      [title]="'Add New User'"
      [buttonText]="'Add User'"
      [isAdmin]="true"
      (formSubmit)="onFormSubmit($event)"
    ></app-user-form>
    <button
      type="button"
      (click)="closeDialog()"
      class="rounded-lg bg-slate-500 w-8 h-8 flex justify-center items-center"
    >
      <mat-icon class="text-white">close</mat-icon>
    </button>
  `,
  styles: ``,
})
export class AddUserDialogComponent {
  constructor(private dialogRef: MatDialogRef<AddUserDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFormSubmit(data: User): void {
    this.dialogRef.close(data);
  }
}
