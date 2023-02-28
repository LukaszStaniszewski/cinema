import { Directive, ElementRef, HostListener, inject, Input } from "@angular/core";

@Directive({
  selector: "input[appFilterOutStrings]",
  standalone: true,
})
export class FilterOutStringsDirective {
  @Input() inputLength?: number;
  private element = inject(ElementRef);

  @HostListener("input", ["$event"]) onInputChange() {
    const initalValue = this.element.nativeElement.value;
    this.element.nativeElement.value = initalValue.replace(/[^0-9]*/g, "").slice(0, this.inputLength);
  }
}
