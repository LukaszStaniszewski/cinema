import { Component } from "@angular/core";
import { ToastStateService } from "@shared/ui/toast/toast.state.service";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.css"],
})
export class ShellComponent {
  constructor(private toastService: ToastStateService) {}

  get toastState$() {
    return this.toastService.toastState$;
  }

  closeToast() {
    this.toastService.closeToast();
  }
}
