import { animate, state, style, transition, trigger } from "@angular/animations";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";

import { OrderVM, UserApiOrderService } from "./user-order-api.service";
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  standalone: true,
  styleUrls: ["./orders.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
  imports: [MatTableModule, NgIf, AsyncPipe, NgFor, MatIconModule],
  providers: [UserApiOrderService],
})
export default class OrdersComponent {
  private userApiOrderService = inject(UserApiOrderService);

  columnsToDisplay = ["tytuł", "dzień", "godzina", "sala"];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];
  expandedElement!: OrderVM | null;
  vm$ = this.userApiOrderService.getAll();
}
