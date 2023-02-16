import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";

import { AppStateWithBookingState, selectTickets } from "./store";

@Injectable()
export class CanActivateReview implements CanActivate {
  private store = inject<Store<AppStateWithBookingState>>(Store);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectTickets).pipe(map(tickets => tickets.length > 0));
  }
}
