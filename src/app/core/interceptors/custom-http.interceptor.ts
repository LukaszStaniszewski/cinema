import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HandleUserErrorService } from "@domains/auth/handle-user-error.service";
import { catchError, EMPTY, filter, Observable, of } from "rxjs";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  readonly baseUrl = "http://localhost:3000";

  constructor(private handleError: HandleUserErrorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clone = request.clone({
      url: `${this.baseUrl}${request.url}`,
    });

    return next.handle(clone).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError.handleError(error);
      })
    );
  }
}
