import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

import { ToastState } from "./toast.state.service";

@Component({
  imports: [NgClass, NgIf, AsyncPipe],
  selector: "app-toast[toast]",
  templateUrl: "./toast.component.html",
  standalone: true,
  styleUrls: ["./toast.component.css"],
})
export class ToastComponent {
  @Input() toast!: ToastState;
  @Output() closeToastEvent = new EventEmitter();

  get iconUrl() {
    return `url("assets/svg/toast/${this.toast.status}.svg")`;
  }

  get toastType() {
    return `toast--${this.toast.status}`;
  }

  protected closeToast() {
    this.closeToastEvent.emit();
  }
}
