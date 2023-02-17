import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  static emailPatternValidator(control: AbstractControl): ValidationErrors | null {
    const regPattern = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const regex = new RegExp(regPattern);

    if (regex?.test(control.value)) {
      return null;
    }
    return { emailValidation: "Nieodpowiedni adres email" };
  }

  static phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const regPattern = /^\+?[1-9][0-9]{8}$/;
    const regex = new RegExp(regPattern);
    console.log("control", control);
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
}
