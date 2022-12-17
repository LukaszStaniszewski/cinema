import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  private static regPattern =
    /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  private static regex = new RegExp(this.regPattern);

  static emailPatternValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (this.regex.test(control.value)) {
      return null;
    }
    return { emailValidation: 'Incorect Email;' };
  }

  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (control?.value === matchingControl?.value) {
        return null;
      }
      return {
        matchValidation: `${control} and ${matchingControl} must match.`,
      };
    };
  }
}
