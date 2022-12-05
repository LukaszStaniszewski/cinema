import { Component, OnChanges, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  NonNullableFormBuilder,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-ticket-purchase-page',
  templateUrl: './ticket-purchase-page.component.html',
  styleUrls: ['./ticket-purchase-page.component.css'],
})
export class TicketPurchasePageComponent implements OnInit {
  errorMessage: string | null = null;
  regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  userCredentialsForm = this.createForm();

  message: ValidationErrors | null;
  constructor(private builder: NonNullableFormBuilder) {
    this.message = null;
    this.userCredentialsForm.valueChanges.subscribe(console.log);
  }

  ngOnInit(): void {}

  private createForm() {
    return this.builder.group({
      name: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      }),
      surname: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      }),
      phoneNumber: this.builder.control(''),
      email: this.builder.control('', {
        validators: [Validators.required, Validators.pattern(this.regex)],
      }),
      confirmEmail: this.builder.control('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });
  }

  get controls() {
    return this.userCredentialsForm.controls;
  }

  private confirmEmailValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    return control.value === this.userCredentialsForm.controls.email
      ? { emailMatch: true }
      : null;
  }

  onSubmit() {
    this.userCredentialsForm.markAllAsTouched();
    if (this.userCredentialsForm.invalid) return;
  }
}
