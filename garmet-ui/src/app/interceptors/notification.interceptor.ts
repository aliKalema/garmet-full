import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {


  constructor(private notificationService: NotificationService, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          this.notificationService.notify(`Connection refused: ${error.error.message}`, 'danger');
        }
        else if (error.status === 0) {
          // Handle connection refused error
          this.notificationService.notify(`Connection refused: ${error.message}`, 'danger');
        }
        else if (error.status === 403) {
          if (error.error.error_message.indexOf('The Token has expired') !== -1) {
            return next.handle(request.clone());
          }
          // Handle connection refused error
          this.notificationService.notify(`${error.status}: ${error.error.error_message}`, 'danger');
        }
        else {
          // The backend returned an unsuccessful response code.
          this.notificationService.notify(error.error.error, 'danger');
        }
        return throwError(() => error);
      })
    );
  }
}
