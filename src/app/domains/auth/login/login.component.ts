import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

import { AuthService } from "..";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  userCredentialsForm = this.createForm();

  constructor(private builder: NonNullableFormBuilder, private authService: AuthService) {}

  createForm() {
    return this.builder.group({
      email: this.builder.control("test@gmail.com", {
        validators: [Validators.required],
      }),
      password: this.builder.control("test", {
        validators: [Validators.required],
      }),
    });
  }

  get email() {
    return this.userCredentialsForm.controls.email;
  }
  get password() {
    return this.userCredentialsForm.controls.password;
  }

  onSubmit() {
    this.userCredentialsForm.markAllAsTouched();
    if (this.userCredentialsForm.invalid) return;
    this.authService.login(this.userCredentialsForm.getRawValue());
  }
}
