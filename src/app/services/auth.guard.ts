// auth.guard.ts
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  // verificar que haya un token
  const token = localStorage.getItem('token');

  if (token) {
    // Si hay token y usuario, permite el acceso a la ruta
    return true;
  } else {
    // Si no hay token, redirige al usuario a la página de inicio de sesión
    router.navigate(['/login']);
    return false;
  }
};

// Este guardia verifica si hay un token en el almacenamiento local. Si lo hay, permite el acceso a la ruta; de lo contrario, redirige al usuario a la página de inicio de sesión.
// Puedes usar este guardia en tu archivo de rutas de la siguiente manera:
