import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

export const authenticationGuard: 
CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);
  
  const isAuthenticated = authenticationService.isAuthenticated();

  if(isAuthenticated) {
    return true;
  }

  if(router.url === 'account/sign-up'){
    router.navigate(['account/sign-in']);
    return false;
  }

  router.navigate(['account/sign-in']);
  return false;
};
