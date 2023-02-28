import { inject, Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";

import { AppStateWithBookingState, selectTickets } from "./store";

@Injectable()
export class CanActivateReview implements CanActivate {
  private store = inject<Store<AppStateWithBookingState>>(Store);
  private router = inject(ActivatedRoute);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log();
    return this.store.select(selectTickets).pipe(
      map(tickets => {
        if (tickets.length > 0) return true;
        return false;
      })
    );
  }
}
