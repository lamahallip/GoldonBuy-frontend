import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const token = authService.getTokenFromLocalStorage()

  if(token) {
    const reqToken = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }) 
    return next(reqToken)
  }

  return next(req);
};
