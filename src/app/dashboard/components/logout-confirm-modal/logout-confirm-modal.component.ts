import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout-confirm-modal',
  standalone: true,
  templateUrl: './logout-confirm-modal.component.html',
  styleUrls: ['./logout-confirm-modal.component.css']
})
export class LogoutConfirmModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  confirmLogout() {
    this.confirmed.emit();
  }

  closeModal() {
    this.canceled.emit();
  }
}