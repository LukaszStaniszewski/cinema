import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { MESSAGE } from "@environments/constants";
import { useNavigate } from "@shared/inject-hooks";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";

import { CustomValidators } from "../../../shared/custom-validators";
import { BlikDialogComponent, ReviewStateService } from ".";

@Component({
  selector: "app-ticket-purchase-page",
  templateUrl: "./ticket-purchase-page.component.html",
  styleUrls: ["./ticket-purchase-page.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketPurchasePageComponent implements OnInit {
  params = "";
  hasQuitSubmitMessagBeenShown = false;

  private builder = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private reviewService = inject(ReviewStateService);
  private toast = inject(ToastStateService);
  private dialog = inject(MatDialog);
  private navigate = useNavigate();
  userCredentialsForm = this.createForm();

  get reviewState$() {
    return this.reviewService.reviewState$;
  }

  private createForm() {
    return this.builder.group(
      {
        firstName: this.builder.control("", {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
        }),
        secondName: this.builder.control("", {
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
    // this.dialog.open(PaymentComponent);
  }

  get controls() {
    return this.userCredentialsForm.controls;
  }

  onSubmit() {
    this.userCredentialsForm.markAllAsTouched();
    if (this.userCredentialsForm.invalid) return;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BlikDialogComponent, {
      data: {
        userCredentials: this.userCredentialsForm.getRawValue(),
        totalPrice: this.reviewService.getTotalPrice(),
      },
      ariaModal: true,
      role: "dialog",
      disableClose: true,
      closeOnNavigation: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      if (result) {
        this.navigate(`/booking/summary/${this.params}`);
      }
      if (this.hasNotBeenShown()) {
        this.hasQuitSubmitMessagBeenShown = true;
        this.toast.activateToast({ message: MESSAGE.ORDER_RESIGN, status: "info" });
      }
    });
  }
  private hasNotBeenShown() {
    return !this.hasQuitSubmitMessagBeenShown;
  }
}
