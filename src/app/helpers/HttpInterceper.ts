import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * A JSON Web Token inspector for adding token to the Headers for Authorization
 */

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // check if the current user is logged in
    // if the user making the request is logged in, he will have JWT token in it's local storage, which is set by Authorization Service during login process
    let authToken = JSON.parse(localStorage.getItem('authToken'));
    if (authToken && authToken.token) {
      // clone the incoming request and add JWT token in the cloned request's Authorization Header
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken.token}`,
        },
      });
    }

    // handle any other requests which went unhandled
    return next.handle(request);
  }
}
