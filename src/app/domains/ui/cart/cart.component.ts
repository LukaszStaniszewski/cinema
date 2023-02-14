import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
  standalone: true,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CartComponent {
  @Input() Order = "";
}
