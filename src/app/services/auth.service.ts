import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authChecked = false;
 apiUrl: string = "http://localhost:8080";
  constructor(private router: Router, private http: HttpClient) { }

  async checkAuth(): Promise<boolean> {

    if (this.authChecked) {
      return !!this.getLocalStorageToken();
    }
    const token = this.getLocalStorageToken();
    this.authChecked = true;
    if (token) {
      try {
        const isValid = await this.validateToken(token); // Implementa esta función
        return isValid;
      } catch {
        return false;
      }
    }
    return false;
  }

  public validateToken(token: string): Promise<boolean> {
    // Ejemplo: Petición HTTP al backend
    return new Promise((resolve) => {
      this.http.get<boolean>('http://localhost:8080/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (res) => {
          console.log('Token válido', res);
          this.router.navigate(['/dashboard']);
          resolve(true); // Retorna true si el token es válido
        },
        error: (err) => {
          if (err.status === 401 || err.status === 403) {
            //this.logout();
            resolve(false); // Token inválido
          } else {
            alert('Ocurrió un error al validar el token: ' + (err.error?.message || err.message || 'Error desconocido'));
            resolve(false);
          }
        }
      });
    });
  }

  // Angular version of useLocalStorage as a single function sin parámetros
  getLocalStorageToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    try {
      const key = 'token';
      const item = localStorage.getItem(key);
      return item ? item : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Limpiar credenciales
clearToken(): void {
  localStorage.removeItem('token');
}

  setLocalStorageToken(key: string, value: string): void {
    try {
      if (typeof localStorage === 'undefined') {
        return;
      }
      localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }
  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token'); // Elimina el token
    localStorage.removeItem('id'); // Elimina el token
    this.router.navigate(['/login']); // Redirige al login
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }
}