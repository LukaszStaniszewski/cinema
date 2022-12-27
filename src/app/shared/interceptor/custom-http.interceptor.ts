import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, filter, Observable, of } from 'rxjs';
import { HandleUserErrorService } from '../../domains/user/handle-user-error.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  readonly baseUrl = 'http://localhost:3000';
  constructor(private handleError: HandleUserErrorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let clone = request.clone({
      url: `${this.baseUrl}${request.url}`,
    });

    return next.handle(clone).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError.handleError(error);
      })
    );
  }
}