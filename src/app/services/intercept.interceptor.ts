import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isLogged()) {
      const authToken = this.authService.getAuthorizationToken();
      request.clone({
        setHeaders: { Authorization: `Baerer ${authToken}` }
      }
      );
    }
    return next.handle(request);
  }
}
