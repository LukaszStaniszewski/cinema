import { Component } from "@angular/core";
import { AuthService } from "@domains/auth";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.css"],
})
export class ShellComponent {
  constructor(private toastService: ToastStateService, private authService: AuthService) {}

  get authState$() {
    return this.authService.authState$;
  }

  get toastState$() {
    return this.toastService.toastState$;
  }

  closeToast() {
    this.toastService.closeToast();
  }
}
