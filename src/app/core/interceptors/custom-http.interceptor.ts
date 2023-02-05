import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HandleUserErrorService } from "@domains/auth/handle-user-error.service";
import { catchError, Observable, tap } from "rxjs";
import { API } from "src/environments/constants";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  private readonly baseUrl = "http://localhost:3000/api";

  private handleErrorService = inject(HandleUserErrorService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = `${this.baseUrl}${request.url}`;

    const clone = request.clone({ url, withCredentials: true });

    return next.handle(clone).pipe(catchError(error => this.handleErrorService.handleError(error)));
  }
}
