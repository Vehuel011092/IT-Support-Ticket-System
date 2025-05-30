import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../interfaces/user.interface';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-delete-user-confirm-modal',
 standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './delete-user-confirm-modal.component.html',
  styleUrls: ['./delete-user-confirm-modal.component.css']
})
export class DeleteUserConfirmModalComponent {
  @Input() user: User | null = null;
  @Output() confirmed = new EventEmitter<number>();
  @Output() canceled = new EventEmitter<void>();

  closeModal() {
    this.canceled.emit();
  }

  confirmDelete() {
    if (this.user) {
      this.confirmed.emit(this.user.id);
    }
  }
}