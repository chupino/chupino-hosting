import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const token = cookieService.get('token');

  if (token) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};