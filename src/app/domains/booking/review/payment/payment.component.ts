import { Component, Inject, inject } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

type DialogData = {
  code: "";
};

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent {
  // dialogRef!: MatDialogRef<PaymentComponent>;
  // data = inject(MAT_DIALOG_DATA);
  private builder = inject(NonNullableFormBuilder);

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  paymentForm = this.builder.group({
    code: "",
  });

  submit() {
    return this.paymentForm.getRawValue();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
