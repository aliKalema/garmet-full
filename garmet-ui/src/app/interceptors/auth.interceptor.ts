import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable,  throwError} from 'rxjs';
import {  switchMap } from 'rxjs/operators';
import {Token} from "../interfaces/token";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService :AuthService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token :Token = JSON.parse(localStorage.getItem('token')!);
    if (request.url === '/api/token/refresh') {
      return next.handle(request);
    }
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.access_token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        this.authService.logout();
        return throwError("");
        // if (error.status === 403 && error.error.error_message.indexOf("The Token has expired") !== -1) {
        //
        //   return this.authService.refreshToken().pipe(
        //     switchMap((response: Token) => {
        //       localStorage.setItem('token',JSON.stringify(response));
        //       // Update request with new access token
        //       request = request.clone({
        //         setHeaders: {
        //           Authorization: `Bearer ${response.access_token}`
        //         }
        //       });
        //       // Retry the request with the new token
        //       return next.handle(request);
        //     }),
        //     catchError((refreshError) => {
        //       // Handle token refresh error, e.g., redirect to login page
        //       return throwError(refreshError);
        //     })
        //   );
        // } else {
        //   // Handle other error cases
        //   return throwError(error);
        // }
      })
    );
  }


}
