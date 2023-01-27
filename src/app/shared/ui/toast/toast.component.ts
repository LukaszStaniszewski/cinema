import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";

type Status = "success" | "info" | "warning" | "error";
@Component({
  imports: [NgClass],
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  standalone: true,
  styleUrls: ["./toast.component.css"],
})
export class ToastComponent {
  @Input() toastStatus: Status = "error";

  get iconUrl() {
    return `url("assets/svg/toast/${this.toastStatus}.svg")`;
  }
  get toastType() {
    return `toast--${this.toastStatus}`;
  }
}
