import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  /*
   * “Identifies and handles a given HTTP request,” appending the current user’s token to it
   */
  intercept(req, next) {
    let auth = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return next.handle(tokenizedReq);
  }
  constructor(private injector: Injector) {}
}
