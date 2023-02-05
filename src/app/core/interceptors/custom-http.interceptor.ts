import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HandleAuthErrorService } from "@domains/auth/handle-auth-error.service";
import { catchError, Observable, tap } from "rxjs";
import { API } from "src/environments/constants";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  private readonly baseUrl = "http://localhost:3000/api";

  private handleErrorService = inject(HandleAuthErrorService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = `${this.baseUrl}${request.url}`;

    const clone = request.clone({ url, withCredentials: true });

    return next.handle(clone).pipe(catchError(error => this.handleErrorService.handleError(error)));
  }
}
