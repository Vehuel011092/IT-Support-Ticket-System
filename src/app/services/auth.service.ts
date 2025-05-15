import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router, private http: HttpClient) { }

  checkTokenOnInit(): Promise<boolean> {
      if (typeof Storage === 'undefined') {
        this.router.navigate(['/login']);
        return Promise.resolve(false);
      }else {
    const token: string | null = localStorage.getItem('token');
    return new Promise((resolve) => {
      this.http.get<{ valid: boolean }>('https://x8ki-letl-twmt.n7.xano.io/api:1yoDTzbI/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
      next: (res) => {
        console.log('Token válido', res);
        this.router.navigate(['/dashboard']);
        resolve(true); // Retorna true si el token es válido
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403) {
        this.logout();
        resolve(false); // Token inválido
        } else {
        alert('Ocurrió un error al validar el token: ' + (err.error?.message || err.message || 'Error desconocido'));
        resolve(false);
        }
      }
      });
    });
  }
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token'); // Elimina el token
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
      })
    );
  }
}