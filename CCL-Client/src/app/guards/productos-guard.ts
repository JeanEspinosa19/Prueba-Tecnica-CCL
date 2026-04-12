import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/tokens';
import { inject } from '@angular/core';

export const productosGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService);
  const router = inject(Router);

  const expectedRol = route.data['expectedRol'];
  const realRol = token.isAdmin() ? 'Admin' : 'Viewer';

  if (!token.isLogged() || !expectedRol.includes(realRol)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
