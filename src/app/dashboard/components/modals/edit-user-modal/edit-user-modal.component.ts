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
    idRol: null,
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

   loadUserData() {
    this.userService.getUserProfile(this.userId!).subscribe({
      next: (userData) => {
        this.user = userData;
        this.loading = false;
        
        // Inicializar idRol con el primer rol del usuario (si existe)
        if (userData.roles && userData.roles.length > 0) {
          this.user.idRol = userData.roles[0].id;
        }
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
// Solo un rol seleccionado, toma el primer ID
    const updatedUser = {
      name: this.user.name,
      email: this.user.email,
      status: this.user.status,
      role:  [this.user.idRol]
    };
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