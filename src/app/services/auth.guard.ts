// auth.guard.ts
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

  export const authGuard: CanActivateFn = async() => {
    const router = inject(Router);

    return new Promise<boolean>((resolve) => {
      if (typeof Storage === 'undefined') {
        router.navigate(['/login']);
        resolve(false);
        return;
      }
      const token: string | null = localStorage.getItem('token');
      if (!token) {
        router.navigate(['/login']);
        resolve(false);
        return;
      }
      resolve(true);
    });
  };


// Este guardia de autenticación verifica si el usuario tiene un token válido en localStorage.
// Si no hay token, redirige al usuario a la página de inicio de sesión.
