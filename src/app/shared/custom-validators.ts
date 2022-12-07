import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  private static regPattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  private static regex = new RegExp(this.regPattern);

  static emailPatternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.regPattern.test(control.value)) {
        return null;
      }
      return { emailValidation: 'Incorect Email;' };
    };
  }
  static emailMatcherValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log('control', control);
      if (this.regPattern.test(control.value)) {
        return null;
      }
      return { emailValidation: 'ssss;' };
    };
  }
}
