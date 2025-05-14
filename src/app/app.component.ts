import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  constructor(public authService: AuthService) {}
 async ngOnInit() {
    await this.authService.initializeAuth(); // Inicializa la autenticación al cargar la aplicación
    const isAuthenticated = this.authService.isAuthenticated(); // Verifica si el usuario está autenticado
    if (isAuthenticated) {
      this.authService.checkTokenOnInit(); // Verifica el token al iniciar la aplicación
    } else {
      this.authService.logout(); // Si no está autenticado, cierra sesión
    }
    // Aquí puedes agregar más lógica si es necesario
  }
}

