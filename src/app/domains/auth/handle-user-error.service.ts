import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { throwError } from "rxjs";

import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class HandleUserErrorService {
  private authService = inject(AuthenticationService);
  private cookieService = inject(CookieService);

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error occurred:", error.error);
    } else if (error.error === "jwt expired") {
      this.cookieService.delete("accessToken", "/");
      this.authService.logout();
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error("Something bad happened; please try again later."));
  }
}
