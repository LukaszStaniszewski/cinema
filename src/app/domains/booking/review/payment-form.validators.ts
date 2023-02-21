import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { API } from "@environments/constants";
import { catchError, delay, distinctUntilChanged, map, Observable, of } from "rxjs";

export class PaymentFormValidators {
  static blikCode(control: AbstractControl): Observable<ValidationErrors | null> {
    // return (control: AbstractControl) => {
    return of(null).pipe(delay(1000));
  }

  static coupon(): AsyncValidatorFn {
    const http = inject(HttpClient);

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      return http.get(`${API.COUPON}/${control.value}`).pipe(
        distinctUntilChanged(),
        map(() => null),
        catchError(() => of({ invalidCode: "Podany kupon jest nieprawidłowy" }))
      );
    };
  }
}
