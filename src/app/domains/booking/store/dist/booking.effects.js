"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookingEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var store_1 = require("@ngrx/store");
var rxjs_1 = require("rxjs");
var ticket_state_service_1 = require("../reservation/shared/ticket.state.service");
var booking_actions_1 = require("./booking.actions");
var BookingEffects = /** @class */ (function () {
    function BookingEffects() {
        var _this = this;
        this.actions$ = core_1.inject(effects_1.Actions);
        this.store = core_1.inject(store_1.Store);
        this.ticketService = core_1.inject(ticket_state_service_1.TicketStateService);
        this.createTicket$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(booking_actions_1.BookingActions.add_seat), 
            // exhaustMap((seat) => this.ticketService.mapSeatAndTicketType(seat))
            rxjs_1.map(function (seat) { return _this.ticketService.mapSeatAndTicketType(seat); }), rxjs_1.map(function (ticket) { return booking_actions_1.BookingActions.add_ticket(ticket); })
            // tap(({}) => )
            );
        });
        // createTicket$2 = createEffect(() => {
        //   return this.actions$.pipe(
        //     exhaustMap((seat) => combineLatest([this.store.select(selectTickets), of(seat)])),
        //     map(([ticketsState, seat]) => this.ticketService.mapSeatAndTicketType(seat)),
        //     map(ticket => BookingActions.add_ticket(ticket))
        //     // tap(({}) => )
        //   );
        // });
        // removeTicket$ = createEffect(() => {
        //   return this.actions$.pipe(
        //     ofType(BookingActions.remove_ticket),
        //     map(ticket => ticket.id )
        //   )
        // })
        // Gdy createEffect nie ma akcji do której mógłby przekierować, to wywołuje wkoło tą jedną akcję.
        // dispatch false zapobiega nieskończonej pętli,
        // createTicket$ = createEffect(() => {
        //   return this.actions$.pipe(ofType(bookingActions.add_seat));
        // }, {dispatch: false});
    }
    BookingEffects = __decorate([
        core_1.Injectable()
    ], BookingEffects);
    return BookingEffects;
}());
exports.BookingEffects = BookingEffects;
