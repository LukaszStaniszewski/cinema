import { Directive, ElementRef, HostListener, NgModule } from "@angular/core";

@Directive({
  selector: "[appMouseAnimation]",
})
export class MouseAnimationDirective {
  constructor(private element: ElementRef) {}

  @HostListener("mousemove", ["$event"]) onMouseMove(event: MouseEvent) {
    const [x, y] = this.calculateCoordinates(event);

    this.setCoordinates(x, y);
  }
  private calculateCoordinates(event: MouseEvent) {
    const rect = this.element.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
  }

  private setCoordinates(x: number, y: number) {
    this.element.nativeElement.style.setProperty("--mouse-x", `${x}px`);
    this.element.nativeElement.style.setProperty("--mouse-y", `${y}px`);
  }
}

@NgModule({
  declarations: [MouseAnimationDirective],
  exports: [MouseAnimationDirective],
})
export class MouseAnimationModule {}
