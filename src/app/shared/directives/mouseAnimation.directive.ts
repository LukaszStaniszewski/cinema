import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, EventEmitter, Inject, Output } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";

@Directive({
  selector: "[appAnimation]",
})
export class MouseAnimationDirective {
  @Output() appClickOutside = new EventEmitter<void>();

  documentClickSubscription: Subscription | undefined;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // ngAfterViewInit(): void {
  //   this.documentClickSubscription = fromEvent(this.document, "onmousemove").pipe()
  // }
}
