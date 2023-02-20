import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { API } from "@environments/constants";
import { QRCodeModule } from "angularx-qrcode";
import { Observable } from "rxjs";
@Component({
  selector: "app-payment-summary",
  templateUrl: "./payment-summary.component.html",
  styleUrls: ["./payment-summary.component.css"],
  standalone: true,
  imports: [QRCodeModule, NgIf, AsyncPipe, JsonPipe],
})
export default class PaymentSummaryComponent implements OnInit {
  vm$ = new Observable<{ email: string }>();

  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const params = this.route.snapshot.params["id"];
    this.vm$ = this.getEmail(params);
  }

  getEmail(orderId: string) {
    return this.http.get<{ email: string }>(`${API.ORDER_EMAIL}/${orderId}`);
  }
}
