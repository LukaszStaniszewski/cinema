import { inject, Injectable } from "@angular/core";
import { TicketStateService } from "@domains/booking/reservation/shared/ticket.state.service";

@Injectable({
  providedIn: "root",
})
export class CinemaRoomStateService {
  private ticketService = inject(TicketStateService);
}
