import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { delay, Observable, of, timeout } from "rxjs";

export class CustomValidators {
  static emailPatternValidator(control: AbstractControl): ValidationErrors | null {
    const regPattern = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const regex = new RegExp(regPattern);
    const value = control.value;
    if (!value) {
      control.markAsPristine({ onlySelf: true });

      return null;
    }

    if (regex?.test(value)) {
      return null;
    }
    return { emailValidation: "Nieodpowiedni adres email" };
  }

  static phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const regPattern = /^\+?[1-9][0-9]{8}$/;
    const regex = new RegExp(regPattern);
    if (!control.value) {
      control.markAsPristine({ onlySelf: true });
      return null;
    }

    if (regex?.test(control.value)) {
      return null;
    }
    return {
      phoneNumberValidation: "Numer telefonu musi składać się z 9 cyrf",
    };
  }

  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (control?.value === matchingControl?.value) {
        return null;
      }
      return {
        matchValidation: `${controlName} i ${matchingControlName} nie są identyczne.`,
      };
    };
  }

  static exactLength(requiredLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: number = control.value;
      const length = value?.toString().length;
      if (length === requiredLength) {
        return null;
      }

      return {
        requiredLength: `Kod musi składać się z ${requiredLength} znaków`,
      };
    };
  }

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
}
