import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/user.service';
import { DeleteUserConfirmModalComponent } from '../../modals/delete-user-confirm-modal/delete-user-confirm-modal.component';
import { CreateUserModalComponent } from '../../modals/create-user-modal/create-user-modal.component';
import { EditUserModalComponent } from '../../modals/edit-user-modal/edit-user-modal.component';


@Component({
  selector: 'app-users-list',
  imports: [CommonModule, FormsModule, DeleteUserConfirmModalComponent, NgIf, CreateUserModalComponent, EditUserModalComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  currentPage = 1;
  itemsPerPage = 20;
  searchTerm = '';
  loading = true;
  error = '';
  showDeleteModal = false;
  showCreateModal = false;
  selectedUser: User | null = null;
  isAdmin: boolean = false; // Variable para controlar si es administrador
  successMessage: string = ''; // Mensaje de éxito para mostrar en la UI
  showEditModal = false;
  selectedUserId: number | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.loadUsers();
  }

  getCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isAdmin = false;
      return;
    }
    this.userService.getCurrentUser(token).subscribe({
      next: (user) => {
        // Verificamos si el rol del usuario actual es "Administrador"
        this.isAdmin = user.role === 'Administrador';
      },
      error: (err) => {
        console.error('Error al obtener usuario actual', err);
        this.isAdmin = false; // En caso de error, no mostrar los botones
      }
    });
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = [...this.users];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        this.loading = false;
        console.error(err);
      }
    });
  }

  searchUsers(): void {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.id.toString().includes(term)
    );
    this.currentPage = 1; // Resetear a la primera página
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  createUser() {
    this.showCreateModal = true;
  }

  editUser(userId: number) {
    this.selectedUserId = userId;
    this.showEditModal = true;
  }

  openDeleteModal(user: any) {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  onDeleteConfirmed(userId: number): void {
    this.showDeleteModal = false;
    this.deleteUser(userId);
  }

  onUserCreated(userData: any): void {
    this.showCreateModal = false;

    this.userService.createUser(userData).subscribe({
      next: (newUser) => {
        // Mostrar mensaje de éxito
        // Asumimos que newUser tiene una propiedad 'name', o usamos un genérico.
        this.successMessage = `Usuario ${newUser?.name || 'nuevo'} creado exitosamente!`;
        setTimeout(() => this.successMessage = '', 3000);

        // Recargar la lista de usuarios desde el servidor
        this.loadUsers();

        // Resetear la búsqueda y paginación para asegurar que el nuevo usuario sea visible
        // y la vista esté limpia. loadUsers() actualiza this.users y this.filteredUsers.
        this.searchTerm = '';
        this.currentPage = 1;
      },
      error: (err) => {
        console.error('Error creando usuario:', err);
        this.error = 'Error al crear el usuario. Por favor, inténtelo de nuevo.';
        // Opcionalmente, limpiar el mensaje de error después de un tiempo
        setTimeout(() => this.error = '', 5000);
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error eliminando usuario:', err);
        alert('No se pudo eliminar el usuario');
      }
    });
  }

  onUserUpdated(updatedUser: any): void {
    this.showEditModal = false;
    this.loadUsers();
  }

}