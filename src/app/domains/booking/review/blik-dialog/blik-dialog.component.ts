import { Component, inject, Input } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "@domains/auth";
import { CustomValidators } from "@shared/custom-validators";

import { ReviewStateService } from "../review.service";

type DialogData = {
  userCredentials: User;
  totalPrice: number;
};

@Component({
  selector: "app-payment",
  templateUrl: "./blik-dialog.component.html",
  styleUrls: ["./blik-dialog.component.css"],
})
export class BlikDialogComponent {
  @Input() totalPrice = 0;
  private dialogRef!: MatDialogRef<BlikDialogComponent>;
  private reviewService = inject(ReviewStateService);
  public data = inject<DialogData>(MAT_DIALOG_DATA);

  protected blikCode = new FormControl(null, [
    Validators.required,
    CustomValidators.exactLength(6),
  ]);

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
