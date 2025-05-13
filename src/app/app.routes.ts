import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './services/auth.guard'; // Importa el guardia de autenticación
import { MainContentComponent } from './dashboard/main-content/main-content.component';
// Este archivo define las rutas de la aplicación Angular.


export const routes: Routes = [
    { 
    path: 'login', 
    component: LoginComponent, // Componente de inicio de sesión
    title: 'Soporte UAD' 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
     canActivate: [authGuard], // 👈 (Lo agregaremos después)
     children: [
      { path: '', component: MainContentComponent }, // Ruta por defecto
      // Aquí agregarás más rutas hijas luego
    ],
    title: 'Soporte UAD' 
  },
  { 
    path: '', 
    redirectTo: 'login', // Redirige la ruta raíz al login
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'login' // Ruta comodín (404) también al login
  }
  
];
