import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient,withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BootstrapIcons } from 'ng-bootstrap-icons';
import { BoxArrowRight } from 'ng-bootstrap-icons/icons';
// Removed invalid import for provideBootstrapIcons
import { PersonCircle, Gear } from 'ng-bootstrap-icons/icons'; // Importa los íconos necesarios


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([]), withFetch()), // Add fetch if needed
    provideAnimations(),
    FontAwesomeModule,
   //import boxarrowright from 'ng-bootstrap-icons/icons/box-arrow-right';
    { provide: BootstrapIcons, useValue: { BoxArrowRight, PersonCircle, Gear } } // Add icons for logout, user, and settings
  ]
};

// Add any icons you want to use globally
library.add(fas);


