import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (user && user.isAdmin) {
    return true;
  }
  
  router.navigate(['/home/all-trips']);
  return false;
};
