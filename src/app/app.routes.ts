import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './services/auth.guard'; // Importa el guardia de autenticación
import { MainContentComponent } from './dashboard/main-content/main-content.component';
import { UsersListComponent } from './dashboard/components/users/users-list/users-list.component';
import { TicketsListComponent } from './dashboard/components/tickets/tickets-list/tickets-list.component';
// Este archivo define las rutas de la aplicación Angular.

export const dashboardRoutes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'tickets', component: TicketsListComponent },
  { path: '', component: MainContentComponent }, // Ruta por defecto
  { path: '**', component: MainContentComponent } // Ruta por defecto
];


export const routes: Routes = [
  // Componente de inicio de sesión
    { path: 'login', component: LoginComponent, title: 'Soporte UAD' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], children: dashboardRoutes, /* 👈 Rutas hijas*/ title: 'Soporte UAD' },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a la ruta de inicio de sesión por defecto
];
// La propiedad 'canActivate' se utiliza para proteger la ruta de acceso al componente Dashboard.
// Si el usuario no está autenticado, será redirigido al componente de inicio de sesión.
