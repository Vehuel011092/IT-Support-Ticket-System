import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
  imports: [FormsModule, NgIf],
  standalone: true,

})
export class LoginComponent {
  isLoading = true; // Cambia a true para mostrar el spinner al cargar el componente
  isAuthenticated = false; // Cambia a true para mostrar el spinner al cargar el componente
  async ngOnInit(): Promise<void> {
    // Verificación inicial síncrona del token
    const token = this.authService.getLocalStorageToken();

    if (!token) {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      return;
    }

    try {
      // Verificación real solo si existe token
      const isValid = await this.authService.validateToken(token);

      if (isValid) {
        this.router.navigate(['/dashboard']);
      }

    } catch (error) {
      console.error('Error validando token:', error);
      this.authService.clearToken(); // Limpiar token inválido
    } finally {
      this.isLoading = false;
    }
  }

  credentials = {
    email: '',
    password: ''
  };

  errorMessage: string = ''; // Added property to handle error messages

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    //quiero validar que el email y la contraseña no esten vacios
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Por favor, complete todos los campos'; // Mensaje simple
      return;
    }
    //quiero validar que el email tenga un formato correcto
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.credentials.email)) {
      this.errorMessage = 'Por favor, ingrese un email válido'; // Mensaje simple
      return;
    }

    this.authService.login(this.credentials.email, this.credentials.password).subscribe({
      next: (response) => {
      if (response?.status === 'success') {
        this.authService.setLocalStorageToken('token', response.token)
        this.router.navigate(['/dashboard']); // Redirige al dashboard
      } else if (response?.status === 'error') {
        switch (response.code) {
        case 'USER_NOT_FOUND':
          this.errorMessage = 'El correo no está registrado';
          break;
        case 'INVALID_PASSWORD':
          this.errorMessage = 'Contraseña incorrecta';
          break;
        case 'SERVER_ERROR':
          this.errorMessage = 'Error interno del servidor';
          break;
        default:
          this.errorMessage = 'Error desconocido';
          break;
        }
      } else {
        this.errorMessage = 'Respuesta inesperada del servidor';
      }
      },
      error: (error) => {
      this.errorMessage = 'No se pudo conectar con el servidor';
      console.error('Error al iniciar sesión', error);
      }
    });
  }

}

