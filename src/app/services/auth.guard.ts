// auth.guard.ts
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const token = localStorage.getItem('token');
  
  if (token) {
    return true; // Permite acceso
  } else {
    router.navigate(['/login']);
    return false;
  }
};

// Este guardia verifica si hay un token en el almacenamiento local. Si lo hay, permite el acceso a la ruta; de lo contrario, redirige al usuario a la página de inicio de sesión.
// Puedes usar este guardia en tu archivo de rutas de la siguiente manera:
