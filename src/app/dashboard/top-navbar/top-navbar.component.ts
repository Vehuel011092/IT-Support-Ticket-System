import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { BoxArrowRight } from 'ng-bootstrap-icons/icons';
import { IconsModule } from '../../icons/icons.module';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule, BootstrapIconsModule,IconsModule, NgIf],
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
   isDropdownOpen = false;
  user = {
    name: 'Admin User',  // Reemplaza con datos reales (ej: desde un servicio)
    email: 'admin@example.com', // Reemplaza con datos reales (ej: desde un servicio)
    role: 'Administrator', // Reemplaza con datos reales (ej: desde un servicio)
    avatar: 'https://via.placeholder.com/150' // URL de la imagen del avatar
  };

  // Configura íconos (si usas ng-bootstrap-icons)
  icons = { BoxArrowRight };

  constructor(private router: Router) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
// Este componente es una barra de navegación superior que emite un evento para alternar la visibilidad de la barra lateral (sidebar) cuando se hace clic en el botón de menú.