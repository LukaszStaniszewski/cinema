import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
  InjectorType,
  ProviderToken,
} from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { MESSAGE } from "@environments/constants";

import { AuthService } from "..";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private builder = inject(NonNullableFormBuilder);
  authService = inject(AuthService);
  private changeDetector = inject(ChangeDetectorRef);

  loginForm = this.createForm();

  createForm() {
    return this.builder.group({
      email: this.builder.control("test@gmail.com", {
        validators: [Validators.required, Validators.email, Validators.maxLength(30)],
        updateOn: "blur",
      }),
      password: this.builder.control("test", {
        validators: [Validators.required, Validators.maxLength(30)],
        updateOn: "blur",
      }),
    });
  }

  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.loginForm.disable();
      this.authService
        .login(this.loginForm.getRawValue())
        .subscribe({
          next: user => this.authService.loginSuccess(user),

          error: () => {
            this.loginForm.setErrors({ authenticationError: MESSAGE.AUTHENTICATION_FAILED }),
              this.changeDetector.detectChanges();
          },
        })
        .add(() => this.loginForm.enable());
    }
  }
}
