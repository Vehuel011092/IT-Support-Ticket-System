import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   logout() {
    localStorage.removeItem('token'); // Elimina el token
    // Redirigir al login (usaremos Router luego)
    window.location.href = '/login'; // Solución temporal
  }

}
