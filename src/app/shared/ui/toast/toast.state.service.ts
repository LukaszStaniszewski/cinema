import { Injectable } from "@angular/core";
import { Maybe } from "@shared/utility-types";
import { BehaviorSubject } from "rxjs";

export type Status = "success" | "info" | "warning" | "error";

export type ToastState = {
  message: Maybe<string>;
  status: Maybe<Status>;
};

@Injectable({
  providedIn: "root",
})
export class ToastStateService {
  private toastState$$ = new BehaviorSubject<ToastState | null>(null);

  get toastState$() {
    return this.toastState$$.asObservable();
  }

  activateToast({ message, status }: ToastState) {
    this.toastState$$.next({
      ...this.toastState$$.value,
      message: message,
      status: status,
    });
  }

  closeToast() {
    this.toastState$$.next(null);
  }
}
