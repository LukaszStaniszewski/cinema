import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HandleUserErrorService } from "@domains/auth/handle-user-error.service";
import { CookieService } from "ngx-cookie-service";
import { catchError, Observable, tap } from "rxjs";
import { API } from "src/environments/constants";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  private readonly baseUrl = "http://localhost:3000/api";

  private handleErrorService = inject(HandleUserErrorService);
  private cookieService = inject(CookieService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}${request.url}`;
    // let clone = request;
    // if (request.url === API.CURRENT_USER) {
    //   clone = this.setAuthHeader(request, url);
    // } else {
    //   clone = request.clone({ url });
    // }
    const clone = request.clone({ url, withCredentials: true });

    // return next.handle(clone).pipe(
    //   tap({
    //     next: (event: any) => event,

    //     error: error => this.handleErrorService.handleError(error),
    //   })
    // );
    return next
      .handle(clone)
      .pipe(catchError(error => this.handleErrorService.handleError(error)));
  }
}
