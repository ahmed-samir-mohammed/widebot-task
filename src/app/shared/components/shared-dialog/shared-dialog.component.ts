/**
 * SharedDialogComponent is a reusable modal dialog component.
 * It displays a modal with a title and content projected via <ng-content>.
 * The modal can be closed by clicking the close button or the backdrop.
 *
 * @selector app-shared-dialog
 * @property {string} title - The title of the modal dialog.
 * @event closeModal - Emits an event when the modal is closed.
 * @event confirmAction - Emits an event when a confirm action is triggered.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../core/interface/user';

@Component({
  selector: 'app-shared-dialog',
  imports: [],
  template: `
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50"
      (click)="onBackdropClick()"
    ></div>
    <div
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-lg w-96 z-50 shadow-lg"
    >
      <div
        class="flex justify-between items-center p-4 border-b border-slate-700"
      >
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <button
          type="button"
          class="text-lg font-bold bg-slate-600 text-gray-300 hover:bg-gray-700 w-8 h-8 rounded"
          (click)="close()"
        >
          ×
        </button>
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class SharedDialogComponent {
  @Input() title: string = 'Modal Title';
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirmAction: EventEmitter<User> = new EventEmitter<User>();

  close() {
    this.closeModal.emit();
  }

  confirm() {
    this.confirmAction.emit();
  }

  onBackdropClick() {
    this.close(); // Close when clicking on the backdrop
  }
}
