// auth.guard.ts
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Espera a que se complete la verificación inicial
  const isAuthenticated = await authService.checkAuth();
  if (isAuthenticated) {
    return true; // Permite el acceso
  } else {
    // Redirige SOLO si no estamos ya en login (evita bucle)
    if (!router.url.includes('/login')) {
      router.navigate(['/login']);
    }
    return false;
  }
}


// Este guardia de autenticación verifica si el usuario tiene un token válido en localStorage.
// Si no hay token, redirige al usuario a la página de inicio de sesión.
