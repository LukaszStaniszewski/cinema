import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-rating",
  template: `
    <div class="rating">
      <div class="star-wrapper">
        <input #star10 name="{{ 'star' + id }}" type="radio" class="s1" (click)="setRate(10)" />
        <input #star9 name="{{ 'star' + id }}" type="radio" class="s1" (click)="setRate(9)" />
        <input #star8 name="{{ 'star' + id }}" type="radio" class="s1" (click)="setRate(8)" />
        <input #star7 name="{{ 'star' + id }}" type="radio" class="s1" (click)="setRate(7)" />
        <input #star6 name="{{ 'star' + id }}" type="radio" class="s1" (click)="setRate(6)" />
        <input #star5 name="{{ 'star' + id }}" type="radio" class="s1" (click)="setRate(5)" />
        <input #star4 name="{{ 'star' + id }}" type="radio" class="s1" (click)="setRate(4)" />
        <input #star3 name="{{ 'star' + id }}" type="radio" class="s1" (click)="setRate(3)" />
        <input #star2 name="{{ 'star' + id }}" type="radio" class="s1" (click)="setRate(2)" />
        <input #star1 name="{{ 'star' + id }}" type="radio" class="s1" (click)="setRate(1)" />
      </div>
      <p class="rating__titles" *ngIf="rate">{{ titles.at(rate - 1) }}</p>
    </div>
  `,
  styleUrls: ["./rating.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements AfterContentInit {
  @ViewChild("star1", { static: true }) starElement1!: ElementRef<HTMLInputElement>;
  @ViewChild("star2", { static: true }) starElement2!: ElementRef<HTMLInputElement>;
  @ViewChild("star3", { static: true }) starElement3!: ElementRef<HTMLInputElement>;
  @ViewChild("star4", { static: true }) starElement4!: ElementRef<HTMLInputElement>;
  @ViewChild("star5", { static: true }) starElement5!: ElementRef<HTMLInputElement>;
  @ViewChild("star6", { static: true }) starElement6!: ElementRef<HTMLInputElement>;
  @ViewChild("star7", { static: true }) starElement7!: ElementRef<HTMLInputElement>;
  @ViewChild("star8", { static: true }) starElement8!: ElementRef<HTMLInputElement>;
  @ViewChild("star9", { static: true }) starElement9!: ElementRef<HTMLInputElement>;
  @ViewChild("star10", { static: true }) starElement10!: ElementRef<HTMLInputElement>;
  @Input() max = 10;
  @Input() rate!: number;
  @Input() id = "";
  @Output() rateChange = new EventEmitter<number>();
  titles = [
    "Nieporozumienie",
    "Bardzo zły",
    "Słaby",
    "Ujdzie",
    "Średni",
    "Niezły",
    "Dobry",
    "Bardzo dobry",
    "Rewelacyjny",
    "Arcydzieło",
  ];

  stars = Array(this.max).fill(4);

  setRate(rate: number) {
    this.rate = rate;
    this.rateChange.emit(rate);
  }

  ngAfterContentInit() {
    const starElement = this.giveElementAssociatedWithUserRate(this.rate);
    if (starElement) starElement.nativeElement.checked = true;
  }
  private giveElementAssociatedWithUserRate(rate: number) {
    switch (rate) {
      case 1:
        return this.starElement1;

      case 2:
        return this.starElement2;

      case 3:
        return this.starElement3;

      case 4:
        return this.starElement4;

      case 5:
        return this.starElement5;

      case 6:
        return this.starElement6;

      case 7:
        return this.starElement7;

      case 8:
        return this.starElement8;
      case 9:
        return this.starElement9;
      case 10:
        return this.starElement10;
      default:
        return;
    }
  }
}
