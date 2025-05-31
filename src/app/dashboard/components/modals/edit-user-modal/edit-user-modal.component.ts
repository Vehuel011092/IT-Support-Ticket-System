import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Role } from '../../../../interfaces/roles.interface';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  @Input() userId: number | null = null;
  @Output() saved = new EventEmitter<any>();
  @Output() canceled = new EventEmitter<void>();

  user: any = {
    name: '',
    email: '',
    status: 'active',
    roles: []
  };

  allRoles: Role[] = [];
  selectedRoles: number[] = [];
  loading = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.userId) {
      this.loadUserData();
    }
    this.loadAllRoles();
  }

  loadUserData(): void {
    this.userService.getUserProfile(this.userId!).subscribe({
      next: (user) => {
        this.user = { ...user };
        this.selectedRoles = user.roles.map((r: Role) => r.id);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando usuario', err);
        this.loading = false;
      }
    });
  }

  loadAllRoles(): void {
    this.userService.getAllRoles().subscribe({
      next: (roles) => {
        this.allRoles = roles.map(role => ({
          id: role.id,
          name: role.name
        }));
        //console.log('Roles cargados:', this.allRoles.map(role => role.name));
      },
      error: (err) => {
        console.error('Error cargando roles', err);
      }
    });
  }

  isRoleSelected(roleId: number): boolean {
    return this.selectedRoles.includes(roleId);
  }

  toggleRole(roleId: number): void {
    if (this.isRoleSelected(roleId)) {
      this.selectedRoles = this.selectedRoles.filter(id => id !== roleId);
    } else {
      this.selectedRoles = [...this.selectedRoles, roleId];
    }
  }

  closeModal() {
    this.canceled.emit();
  }
  
  onSubmit() {
    // Encuentra el objeto Role seleccionado por nombre
    const selectedRole = this.allRoles.find(role => role.name === this.user.idRol);

    const updatedUser = {
      name: this.user.name,
      email: this.user.email,
      status: this.user.status,
      roles: this.selectedRoles.map(roleId => ({ id: roleId }))
    };
    console.log('Datos del usuario a actualizar:', updatedUser);
    console.log('ID del usuario a actualizar:', this.userId);
    this.userService.updateUser(this.userId!, updatedUser).subscribe({
      next: (response) => {
        this.saved.emit(response);
      },
      error: (err) => {
        console.error('Error actualizando usuario', err);
      }
    });
  }

  isFormValid(): boolean {
    return !!this.user.name && !!this.user.email;
  }
}