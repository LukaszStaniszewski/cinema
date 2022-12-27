import { Component, OnChanges, OnInit } from '@angular/core';
import {
  Validators,
  ValidationErrors,
  NonNullableFormBuilder,
  AbstractControl,
  AbstractControlOptions,
} from '@angular/forms';

import { CustomValidators } from '../../shared/custom-validators';
@Component({
  selector: 'app-ticket-purchase-page',
  templateUrl: './ticket-purchase-page.component.html',
  styleUrls: ['./ticket-purchase-page.component.css'],
})
export class TicketPurchasePageComponent implements OnInit {
  userCredentialsForm = this.createForm();

  constructor(private builder: NonNullableFormBuilder) {
    console.log(this.userCredentialsForm.errors);
  }

  ngOnInit(): void {}

  private createForm() {
    return this.builder.group(
      {
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
        phoneNumber: this.builder.control('', {
          validators: [CustomValidators.phoneNumberValidator],
        }),
        email: this.builder.control('', {
          validators: [
            Validators.required,
            CustomValidators.emailPatternValidator,
          ],
        }),
        confirmEmail: this.builder.control('', {
          validators: [
            Validators.required,
            CustomValidators.emailPatternValidator,
          ],
        }),
      },
      { validators: [CustomValidators.match('email', 'confirmEmail')] }
    );
  }

  get controls() {
    return this.userCredentialsForm.controls;
  }

  onSubmit() {
    this.userCredentialsForm.markAllAsTouched();
    if (this.userCredentialsForm.invalid) return;
  }
}
