import { Component, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
  imports: [FormsModule,NgIf],
  standalone: true,
  
})
export class LoginComponent  {
  isLoading = true; // Cambia a true para mostrar el spinner al cargar el componente
  isAuthenticated = false; // Cambia a true para mostrar el spinner al cargar el componente
  ngOnInit() {
    // Verifica si existe el token antes de validar autenticación
    const token = this.authService.getLocalStorage<string>('token', '');
    if (!token) {
      this.isLoading = false;
      return;
    }else {
    this.authService.checkAuth().then((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      if (!isAuthenticated) {
      //como ya estamos en login, no redirigimos
      this.isLoading = false;
      } else {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
      }
    }).catch((error: any) => {
      this.isLoading = false;
      console.error('Error al verificar autenticación:', error);
    });
    }
    // Simula una carga de 2 segundos
  }
  
  credentials = {
    email: '',
    password: ''
  };

   errorMessage: string = ''; // Added property to handle error messages

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
      next: () => {
        this.router.navigate(['/dashboard']); // Redirige al dashboard
      },
      error: () => {
        this.errorMessage = 'Error al iniciar sesión'; // Mensaje simple
        console.error('Error al iniciar sesión'); // Mensaje simple
      }
    });
  }

}

