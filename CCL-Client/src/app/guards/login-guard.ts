import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/tokens';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService);
  const router = inject(Router);

  if (token.isLogged()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
