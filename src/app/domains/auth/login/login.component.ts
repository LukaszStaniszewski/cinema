import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

import { AuthenticationService } from "../authentication.service";

type LoginCredentials = {
  email: string;
  password: string;
};
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  userCredentialsForm = this.createForm();

  constructor(
    private builder: NonNullableFormBuilder,
    private authService: AuthenticationService
  ) {}

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
    console.log(this.userCredentialsForm.value);
    this.userCredentialsForm.markAllAsTouched();
    if (this.userCredentialsForm.invalid) return;
    this.authService.login(this.userCredentialsForm.value as LoginCredentials);
  }
}
