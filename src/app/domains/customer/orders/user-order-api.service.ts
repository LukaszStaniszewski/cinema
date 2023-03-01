import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Ticket } from "@domains/booking/store";
import { ShowingPartial } from "@domains/dashboard";
import { catchError, map, of } from "rxjs";

import { API } from "../../../../environments/constants";

export type OrderVM = {
  tytuł: string;
  dzień: string;
  godzina: string;
  sala: string;
  totalPrice: number;
  additional: Ticket[];
};

export type UserPaidOrderDTO = {
  tickets: Ticket[];
  totalPrice: number;
  showingPartial: ShowingPartial;
  cinemaRoom: string;
};

@Injectable()
export class UserApiOrderService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<UserPaidOrderDTO[]>(API.ORDER_PAYED).pipe(
      map(orders => {
        return orders.map((order): OrderVM => {
          return {
            tytuł: order.showingPartial.title,
            dzień: order.showingPartial.day,
            godzina: order.showingPartial.time,
            sala: "A",
            totalPrice: order.totalPrice,
            additional: order.tickets,
          };
        });
      }),
      catchError(() => of([]))
    );
  }
}
