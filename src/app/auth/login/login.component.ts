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
  @ViewChild('loginButton', { static: false }) loginButton!: ElementRef;

  ngAfterViewInit() {
    this.addButtonEffects();
  }
  credentials = {
    email: '',
    password: '',
    authToken: ''
  };

   errorMessage: string = ''; // Added property to handle error messages

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    //validar que haya un token
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No hay token o es invalido'); // Mensaje simple
      // Si no hay token, registrame el token que obtengo de la api
      this.authService.checkTokenOnInit(); // Mensaje simple
    }
      

    //si no hay token, agrega un token que obtengo de la api
    this.credentials.authToken = token ?? '';

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

    this.authService.login(this.credentials.email, this.credentials.password, this.credentials.authToken).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']); // Redirige al dashboard
        //muestrame lo que estoy recibiendo de la api
        console.log('Token recibido:', localStorage.getItem('token')); // Mensaje simple
        //muestrame lo que estoy recibiendo de la api
        console.log('Respuesta de la API:', this.authService.login(this.credentials.email, this.credentials.password, this.credentials.authToken).subscribe(
          (response) => {
            console.log('Respuesta de la API:', response); // Mensaje simple
          },
          (error) => {
            console.error('Error de la API:', error); // Mensaje simple
          }
          )); // Mensaje simple
        //muestrame lo que estoy recibiendo de la api
        console.log('Inicio de sesión exitoso'); // Mensaje simple
      },
      error: () => {
        this.errorMessage = 'Error al iniciar sesión'; // Mensaje simple
        console.error('Error al iniciar sesión'); // Mensaje simple
      }
    });
  }

addButtonEffects() {
    const button = this.loginButton.nativeElement;
    
    // Efecto hover (opcional)
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = 'none';
    });

    // Efecto ripple al hacer clic (como en el demo)
    button.addEventListener('click', (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  }
}

