import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, tap, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Role } from '../interfaces/roles.interface';


@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl: string = "http://localhost:8080";
  
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  //get user profile with id
  getUserProfile(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${id}`, {
      headers: { Authorization: `Bearer ${this.authService.getLocalStorageToken()}` }
    }).pipe(
      tap(user => {
        // Aquí puedes manejar la respuesta del usuario si es necesario
      }),
      map(user => user) // Puedes transformar la respuesta si es necesario
    );
  }

  getCurrentUser(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/user/current-user`, { headers });
  }

  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorageToken()}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/user`, { headers });
  }

  // delete user by id
  deleteUser(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorageToken()}`
    });
    return this.http.delete<any>(`${this.apiUrl}/user/delete/${id}`, { headers });
  }

 createUser(userData: any): Observable<any> {
  // Asegurar que el objeto coincida con lo que espera el backend
  const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorageToken()}`
    });
    console.log(userData);
  const body = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    status: userData.status,
    role: userData.role
  };

  return this.http.post(`${this.apiUrl}/user/register`, body, { headers }).pipe(
    catchError(error => {
      console.error('Error completo:', error);
      return throwError(() => new Error('Error creando usuario'));
    })
  );
}

getAllRoles(): Observable<Role[]> {
   const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorageToken()}`
    });
    return this.http.get<Role[]>(`${this.apiUrl}/user/roles` , { headers }).pipe(
      catchError(error => {
        console.error('Error obteniendo roles:', error);
        return throwError(() => new Error('Error obteniendo roles'));
      })
    );
  }

  updateUser(id: number, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getLocalStorageToken()}`
    });

    // Asegúrate de que el cuerpo de la petición coincida con lo que espera tu backend.
    // Por ejemplo, si solo envías los campos que pueden cambiar:
    const body = {
      name: userData.name,
      email: userData.email,
      status: userData.status,
      roles: userData.roles // Asumiendo que 'roles' es un array de IDs de roles o la estructura que tu backend espere
      // No incluimos la contraseña a menos que explícitamente se permita cambiarla aquí
    };

    return this.http.put(`${this.apiUrl}/user/update/${id}`, body, { headers }).pipe(
      catchError(error => {
        console.error('Error completo al actualizar usuario:', error);
        return throwError(() => new Error('Error actualizando usuario'));
      })
    );
  }
  
}