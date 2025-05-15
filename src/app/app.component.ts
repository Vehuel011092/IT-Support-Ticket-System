import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, MatProgressSpinnerModule,MatIconModule,CommonModule],
  standalone: true,
  providers: [AuthService],
  // Cambia el selector a 'app-root' para que funcione con el módulo raíz
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  constructor(public authService: AuthService) {}
  //validacion para mostrar la pantalla de carga basado en cuando ya se haya terminado de verificar el token 
  async ngOnInit() {
     await this.authService.checkTokenOnInit();
  }
} 


