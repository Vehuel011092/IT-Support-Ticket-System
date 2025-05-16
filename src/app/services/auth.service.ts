import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authChecked = false;
  constructor(private router: Router, private http: HttpClient) { }

  async checkAuth(): Promise<boolean> {

    if (this.authChecked) {
      return  !!this.getLocalStorage<string>('token', '');
    }
    const token = this.getLocalStorage<string>('token', '');
    this.authChecked = true;
    if (token) {
      try {
        const isValid = await this.validateToken(await token); // Implementa esta función
        return isValid;
      } catch {
        return false;
      }
    }
    return false;
  }

  private validateToken(token: string): Promise<boolean> {
    // Ejemplo: Petición HTTP al backend
    return new Promise((resolve) => {
      this.http.get<boolean>('https://x8ki-letl-twmt.n7.xano.io/api:1yoDTzbI/auth/me', {
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

  // Angular version of useLocalStorage as a single function
  async getLocalStorage<T>(key: string, initialValue: T): Promise<T> {
    if (typeof localStorage === 'undefined') {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      if (!item) return initialValue;
      try {
        return JSON.parse(item) as T;
      } catch {
        // Si no es JSON válido, retorna el string tal cual (útil para tokens)
        return item as unknown as T;
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  }

  setLocalStorage(key: string, value: string): void {
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
    this.router.navigate(['/login']); // Redirige al login
  }

  login(email: string, password: string): Observable<{ authToken: string }> {
    // Aquí puedes agregar la lógica para obtener el authToken
    return this.http.post<{ authToken: string }>('https://x8ki-letl-twmt.n7.xano.io/api:1yoDTzbI/auth/login', {
      email,
      password,
    }).pipe(
      tap(response => {
        console.log('Inicio de sesión exitoso'); // Mensaje simple
        this.setLocalStorage('token', response.authToken);
      })
    );
  }
}