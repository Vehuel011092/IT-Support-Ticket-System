import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private  router: Router, private http: HttpClient) {}

 checkTokenOnInit(): void {
  // Verificar si localStorage está disponible
  if (typeof Storage === 'undefined') {
    this.router.navigate(['/login']); // Redirige al login si localStorage no está disponible
    return;
  }
  const token : string | null = localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']); // Redirige al login si no hay token
    return;
  }
 //validar el token con el backend, al endpoint le tengo que pasar el token y si es valido me devuelve el usuario
    this.http.get<{ valid: boolean }>('https://x8ki-letl-twmt.n7.xano.io/api:1yoDTzbI/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe({
    next: (res) => {
      console.log('Token válido', res);
      this.router.navigate(['/dashboard']); // Redirige al dashboard si el token es válido
    },
    error: () => this.logout() // Error = token inválido
  }); 
}

  // Método para cerrar sesión
   logout() {
    localStorage.removeItem('token'); // Elimina el token
    localStorage.removeItem('email'); // Elimina el email
    this.router.navigate(['/login']); // Redirige al login
  }

  login(email: string, password: string): Observable<{ authToken: string }> {
    // Aquí puedes agregar la lógica para obtener el authToken
    return this.http.post<{ authToken: string }>('https://x8ki-letl-twmt.n7.xano.io/api:1yoDTzbI/auth/login', { 
      email, 
      password,
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.authToken); // Guarda el token
        localStorage.setItem('email', email); // Guarda el email
      })
    );
  }
}