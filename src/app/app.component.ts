import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinnerModule,MatIconModule,CommonModule],
  standalone: true,
  // Cambia el selector a 'app-root' para que funcione con el módulo raíz
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
} 


