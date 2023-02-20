import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { API } from "@environments/constants";
import { catchError, debounceTime, delay, distinctUntilChanged, map, Observable, of } from "rxjs";

export class PaymentFormValidators {
  // static blikCode(control: AbstractControl): ValidationErrors | null {
  //   const regPattern = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  //   const regex = new RegExp(regPattern);
  //   const value = control.value;
  //   if (!value) {
  //     control.markAsPristine({ onlySelf: true });

  //     return null;
  //   }

  //   if (regex?.test(value)) {
  //     return null;
  //   }
  //   return { emailValidation: "Nieodpowiedni adres email" };
  // }
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

  // static coupon(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const http = inject(HttpClient);

  //   return http.get(`${API.COUPON}/${control.value}`).pipe(
  //     map(() => null),
  //     catchError(() => of({ invalidCode: "Podany kupon jest nieprawidłowy" }))
  //   );
  // }
}
