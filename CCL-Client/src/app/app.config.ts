import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';
import { productosInterceptor } from './interceptors/productos-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(),withInterceptors([productosInterceptor])),
    provideSweetAlert2(),
  ]
};
