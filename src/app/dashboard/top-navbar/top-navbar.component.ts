import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  imports: [],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css',
  standalone: true
})
export class TopNavbarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

}
// Este componente es una barra de navegación superior que emite un evento para alternar la visibilidad de la barra lateral (sidebar) cuando se hace clic en el botón de menú.