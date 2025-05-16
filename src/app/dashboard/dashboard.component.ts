import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, NgIf,CommonModule, TopNavbarComponent, SidebarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
sidebarVisible = true;
  @ViewChild('sidebar', { static: false }) sidebar!: ElementRef;
  @ViewChild('topNavbar', { static: false }) topNavbar!: ElementRef;
  @ViewChild('content', { static: false }) content!: ElementRef;
  @ViewChild('toggleButton', { static: false }) toggleButton!: ElementRef;
  isLoading = true; // Cambia a true para mostrar el spinner al cargar el componente
  ngOnInit() {
    // Simula una carga de 2 segundos
    setTimeout(() => {
      this.isLoading = false; // Cambia a false para ocultar el spinner después de 2 segundos
    }, 1500);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}
