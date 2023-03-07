import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { API } from "@environments/constants";
import { QRCodeModule } from "angularx-qrcode";

@Component({
  selector: "app-payment-summary",
  templateUrl: "./payment-summary.component.html",
  styleUrls: ["./payment-summary.component.css"],
  standalone: true,
  imports: [QRCodeModule, NgIf, AsyncPipe, JsonPipe],
})
export default class PaymentSummaryComponent {
  isLoading = true;
  params = "";

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  vm$ = this.getEmail(this.route.snapshot.params["id"]);

  getEmail(orderId: string) {
    return this.http.get<{ email: string }>(`${API.ORDER_EMAIL}/${orderId}`, { withCredentials: true });
  }
}
