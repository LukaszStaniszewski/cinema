import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { CustomValidators } from "../../../shared/custom-validators";
import { PaymentComponent } from "./payment/payment.component";
import { ReviewStateService } from "./review.service";

@Component({
  selector: "app-ticket-purchase-page",
  templateUrl: "./ticket-purchase-page.component.html",
  styleUrls: ["./ticket-purchase-page.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketPurchasePageComponent implements OnInit {
  params = "";
  private builder = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private reviewService = inject(ReviewStateService);
  private dialog = inject(MatDialog);
  userCredentialsForm = this.createForm();

  get reviewState$() {
    return this.reviewService.reviewState$;
  }

  private createForm() {
    return this.builder.group(
      {
        name: this.builder.control("", {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
        }),
        surname: this.builder.control("", {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
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

  ngOnInit() {
    this.params = this.route.snapshot.params["id"];
    this.reviewService.getViewData();
  }

  get controls() {
    return this.userCredentialsForm.controls;
  }

  onSubmit() {
    this.userCredentialsForm.markAllAsTouched();
    if (this.userCredentialsForm.invalid) return;
    // this.reviewService.submitOrder(this.userCredentialsForm.getRawValue);
  }
  openDialog(): void {
    // this.dialog.open(PaymentComponent);
    const dialogRef = this.dialog.open(PaymentComponent, {
      // height: "350px",
      // width: "250px",
      // position: { right: "0px", top: "0px" },
      // direction: "rtl",
      disableClose: true,
      closeOnNavigation: true,
    });
    // const dialogRef = this.dialog.open(PaymentComponent, {
    //   // data: { name: this.name, animal: this.animal },
    // });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log("The dialog was closed");
    //   // this.animal = result;
    // });
  }
}
