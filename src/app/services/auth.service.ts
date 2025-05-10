import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private  router: Router, private http: HttpClient) {}

 checkTokenOnInit(): void {
  const token = localStorage.getItem('token');
  // Si no hay token, redirigir al login
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }
  // Ejemplo: Validar token con el backend
  this.http.get<{ valid: boolean }>('https://x8ki-letl-twmt.n7.xano.io/api:1yoDTzbI/auth/login', {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe({
    next: (res) => {
      if (!res.valid) {
        this.logout(); // Token inválido, cierra sesión
      }
    },
    error: () => this.logout() // Error = token inválido
  });
}

   logout() {
    localStorage.removeItem('token'); // Elimina el token
    // Redirigir al login (usaremos Router luego)
    window.location.href = '/login'; // Solución temporal
  }

  login(email: string, password: string, authToken: string): Observable<{ authToken: string }> {
    // Aquí puedes agregar la lógica para obtener el authToken
    return this.http.post<{ authToken: string }>('https://x8ki-letl-twmt.n7.xano.io/api:1yoDTzbI/auth/login', { 
      email, 
      password,
      authToken 
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.authToken); // Guarda el token
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Verifica si hay token
  }
}