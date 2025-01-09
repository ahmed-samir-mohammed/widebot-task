import { UsersService } from './../../../../core/services/users.service';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedUserFormComponent } from '../../../../shared/components/user-form/user-form.component';
import { User } from '../../../../core/interface/user';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-modal',
  imports: [SharedUserFormComponent],
  template: `<app-user-form
    (formSubmit)="onSubmit($event)"
    [title]="'Add New User'"
    [isAdmin]="true" 
    [isNew]="true"
    [buttonText]="'Add User'"
  /> `,
  styles: ``,
})
export class AddUserModalComponent implements OnInit {
  dialogRef = inject(MatDialogRef<AddUserModalComponent>);

  ngOnInit(): void {}

  onSubmit(data: User) {
    data.username = data.details.email.split('@')[0];
    this.dialogRef.close(data);
  }
}
