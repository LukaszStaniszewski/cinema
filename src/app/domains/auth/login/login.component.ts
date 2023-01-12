import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  userCredentialsForm = this.createForm();

  constructor(private builder: NonNullableFormBuilder) {}

  createForm() {
    return this.builder.group({
      email: this.builder.control("", {
        validators: [Validators.required],
      }),
      passwrod: this.builder.control("", {
        validators: [Validators.required],
      }),
    });
  }

  get controls() {
    return this.userCredentialsForm.controls;
  }
  onSubmit() {
    this.userCredentialsForm.markAllAsTouched();
    if (this.userCredentialsForm.invalid) return;
  }
}
