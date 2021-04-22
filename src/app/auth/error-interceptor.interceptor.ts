import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.auth.userValue) {
          // auto logout if 401 or 403 response returned from api
          this.auth.logout();
      }

      const error = (err && err.error && err.error.message) || err.statusText;
      // console.error("Interceptor error: " + err);
      return throwError(error);
  }))
  }
}
