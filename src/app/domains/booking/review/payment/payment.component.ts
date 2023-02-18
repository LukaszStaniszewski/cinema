import { ChangeDetectorRef, Component, Inject, inject, Input } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "@domains/auth";
import { CustomValidators } from "@shared/custom-validators";

import { ReviewStateService } from "../review.service";

type DialogData = {
  userCredentials: User;
};

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent {
  @Input() totalPrice = 0;
  // dialogRef!: MatDialogRef<PaymentComponent>;
  // data = inject(MAT_DIALOG_DATA);
  private builder = inject(NonNullableFormBuilder);
  private changeDetector = inject(ChangeDetectorRef);
  private reviewService = inject(ReviewStateService);

  blikCode = new FormControl(null, [Validators.required, CustomValidators.exactLength(6)]);

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    // this.code.valueChanges.subscribe({
    //   next: value => value,
    //   error: error => console.log(error),
    // });
  }

  // code = new FormControl("", [Validators.required, CustomValidators.exactLength(6)]);
  // code = new FormControl(null, {
  //   validators: [Validators.required, CustomValidators.exactLength(6)],
  // });

  // ngOnInit() {
  //   this.code.
  // }

  // paymentForm = this.builder.control();

  submit() {
    console.log("click submit");
    this.blikCode.markAsPending();
    console.log("data submit", this.data);
    this.reviewService.submitOrder(this.data.userCredentials).subscribe({
      next: () => this.dialogRef.close(this.blikCode.getRawValue()),
      error: () => this.dialogRef.close(),
    });
    setTimeout(() => {
      console.log("hit");
      // this.dialogRef.close(this.blikCode.getRawValue());
    }, 1000);

    // this.changeDetector.detectChanges();
    // this.blikCode.updateValueAndValidity();
    // this.blikCode.markAsTouched();
    // console.log("errors", this.code.errors);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
