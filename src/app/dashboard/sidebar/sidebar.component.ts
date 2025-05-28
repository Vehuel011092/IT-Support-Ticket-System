import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
   utilitiesMenuOpen = false;
   componentsMenuOpen: boolean = false;
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleUtilitiesMenu() {
    this.utilitiesMenuOpen = !this.utilitiesMenuOpen;
  }


toggleComponentsMenu(): void {
  this.componentsMenuOpen = !this.componentsMenuOpen;
}

}
