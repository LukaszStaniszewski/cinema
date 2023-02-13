import { inject, Injectable } from "@angular/core";
import { CanMatch, Route, UrlSegment } from "@angular/router";
import { AuthService } from "@domains/auth";
import { map, Observable, retry, skip, skipWhile, takeWhile } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CanMatchCustomerSection implements CanMatch {
  private authService = inject(AuthService);

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // this.authService.authState$.subscribe(console.log);

    return this.authService.authState$.pipe(
      skipWhile(({ authType }) => authType === null),
      map(({ authType }) => authType === "customer")
    );
    // return this.authService.authState$.pipe(map(state => state.authType === "customer"));
    // console.log(this.authService.)
  }
}
