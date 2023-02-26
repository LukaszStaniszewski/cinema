import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-rating",
  template: ` <div class="star-wrapper">
    <input
      *ngFor="let star of stars; let index = index"
      name="ratingStar"
      type="radio"
      class="s1"
      (click)="setRate(9 - index + 1)"
    />
  </div>`,
  styleUrls: ["./rating.component.css"],
})
export class RatingComponent {
  @Input() max = 10;
  @Input() rate = 0;
  @Output() rateChange = new EventEmitter<number>();
  stars = Array(this.max).fill(4);

  setRate(rate: number) {
    this.rateChange.emit(rate);
  }
}
