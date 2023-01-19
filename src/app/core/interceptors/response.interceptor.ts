import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HandleUserErrorService } from "@domains/auth/handle-user-error.service";
import { CookieService } from "ngx-cookie-service";
import { catchError, EMPTY, filter, Observable, of } from "rxjs";

@Injectable()
export class ResponseInterceptor {
  readonly baseUrl = "http://localhost:3000";

  private handleError = inject(HandleUserErrorService);
  private cookieService = inject(CookieService);

  // constructor(private handleError: HandleUserErrorService) {}

  intercept(
    response: HttpResponse<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userToken = "secure-user-token";
    // if(response.body.hasOwnProperty("accessToken"))
    // const clone = response.clone({
    //   headers: response.headers.set("Authorization", `Bearer ${response.body}`),

    // });
    console.log("response", response);
    return of(response);
  }
}
