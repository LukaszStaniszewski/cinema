import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

import { CustomValidators } from "../../../shared/custom-validators";
import { ReviewStateService } from "./review.service";
@Component({
  selector: "app-ticket-purchase-page",
  templateUrl: "./ticket-purchase-page.component.html",
  styleUrls: ["./ticket-purchase-page.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketPurchasePageComponent {
  userCredentialsForm = this.createForm();

  private builder = inject(NonNullableFormBuilder);
  private reviewService = inject(ReviewStateService);

  private createForm() {
    return this.builder.group(
      {
        name: this.builder.control("", {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
        }),
        surname: this.builder.control("", {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
          ],
        }),
        phoneNumber: this.builder.control("", {
          validators: [CustomValidators.phoneNumberValidator],
        }),
        email: this.builder.control("", {
          validators: [Validators.required, CustomValidators.emailPatternValidator],
        }),
        confirmEmail: this.builder.control("", {
          validators: [Validators.required, CustomValidators.emailPatternValidator],
        }),
      },
      { validators: [CustomValidators.match("email", "confirmEmail")] }
    );
  }

  get controls() {
    return this.userCredentialsForm.controls;
  }

  onSubmit() {
    this.userCredentialsForm.markAllAsTouched();
    if (this.userCredentialsForm.invalid) return;
    // this.reviewService.submitOrder(this.userCredentialsForm.getRawValue);
  }
}
