import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { BoxArrowRight } from 'ng-bootstrap-icons/icons';
import { IconsModule } from '../../icons/icons.module';
import { UserService } from '../../services/user.service'; // Asegúrate de que esta ruta sea correcta
import { LogoutConfirmModalComponent } from "../components/modals/logout-confirm-modal/logout-confirm-modal.component";
import { dropDownMenu } from '../../icons/animations';
	

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule, BootstrapIconsModule, IconsModule, NgIf, LogoutConfirmModalComponent],
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
  animations: [dropDownMenu]
})
export class TopNavbarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  showModal = false;
  role: any;
  name: any;
  email: any;
  splashActive = false;
  isOpen = false;
  constructor(private router: Router, private userService: UserService) { }
  //inicializar variables del usuario como su nombre, email, rol 
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getCurrentUser(token).subscribe({
        next: (user) => {
          this.name = user.name || 'Guest';
          this.email = user.email || 'Guest';
          this.role = user.role || 'Guest';
          this.setUserData(user);
        },
        error: (error) => {
          console.error('Error al obtener el perfil del usuario:', error);
        }
      });
    }
  }
  setUserData(user: any) {
    if (!user) {
      return;
    }
  }


  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
  isDropdownOpen = false;
  isAlertsDropdownOpen = false;

  get user() {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
      avatar: 'https://via.placeholder.com/150' // URL de la imagen del avatar
    };
  }

  // Configura íconos (si usas ng-bootstrap-icons)
  icons = { BoxArrowRight };

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openLogoutModal() {
    this.showModal = true;
    this.isDropdownOpen = false; // Cierra el dropdown al abrir el modal
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.showModal = false;
  }

  // Method to trigger the splash animation
  triggerSplash() {
    this.splashActive = true;
    setTimeout(() => {
      this.splashActive = false;
    }, 300); // Duration matches the CSS animation
  }

  // Add this method to handle search
  onSearch(query: string): void {
    // Implement your search logic here
    console.log('Search query:', query);
  }

}
// Este componente es una barra de navegación superior que emite un evento para alternar la visibilidad de la barra lateral (sidebar) cuando se hace clic en el botón de menú.