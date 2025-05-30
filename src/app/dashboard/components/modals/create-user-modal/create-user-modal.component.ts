import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css']
})
export class CreateUserModalComponent {
  @Output() created = new EventEmitter<any>();
  @Output() canceled = new EventEmitter<void>();
  
  showPassword = false;
  user = {
    name: '',
    email: '',
    password: '',
    status: 'active',
    role: 'user'
  };

  closeModal() {
    this.canceled.emit();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.created.emit({...this.user});
    }
  }

  isFormValid(): boolean {
    return !!this.user.name && !!this.user.email && !!this.user.password;
  }
  
}