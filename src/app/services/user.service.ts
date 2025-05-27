import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

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
}