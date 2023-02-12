import { Component, Input } from "@angular/core";

@Component({
  selector: "app-cart[order]",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent {
  @Input() Order = "";
}
