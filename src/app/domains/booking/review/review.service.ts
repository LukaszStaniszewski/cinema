import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API } from "@environments/constants";

import ReviewModule from "./review.module";

type Order = {
  name: string;
  surname: string;
  email: string;
  phoneNumber?: number;
};

@Injectable({
  providedIn: ReviewModule,
})
export class ReviewStateService {
  private http = inject(HttpClient);
  submitOrder(payload: Order) {
    this.http.post(API.ORDER, payload).subscribe(console.log);
  }
}
