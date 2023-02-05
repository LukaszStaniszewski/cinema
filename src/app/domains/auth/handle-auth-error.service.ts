import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";
import { throwError } from "rxjs";
import { MESSAGE } from "src/environments/constants";

import { AuthService } from ".";

@Injectable({
  providedIn: "root",
})
export class HandleAuthErrorService {
  private authService = inject(AuthService);
  private toastService = inject(ToastStateService);
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error occurred:", error.error);
    } else if (error.error === "jwt expired") {
      this.authService.logout();
      this.toastService.activateToast({
        message: MESSAGE.JWT_EXPIRED,
        status: "warning",
      });
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error("Something bad happened; please try again later."));
  }
}
