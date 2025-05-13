import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
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

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}
