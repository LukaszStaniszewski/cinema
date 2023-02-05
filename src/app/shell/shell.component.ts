import { Component, OnInit } from "@angular/core";
import { AuthService } from "@domains/auth";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.css"],
})
export class ShellComponent implements OnInit {
  constructor(private authService: AuthService, private toastService: ToastStateService) {}

  get toastState$() {
    return this.toastService.toastState$;
  }
  ngOnInit() {
    this.authService.autoLogin();
  }

  closeToast() {
    this.toastService.closeToast();
  }
}
