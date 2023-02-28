import { inject, Injectable } from "@angular/core";
import { CanMatch, Route, UrlSegment } from "@angular/router";
import { AuthService } from "@domains/auth";
import { map, Observable, skipWhile } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CanMatchNonAuthSection implements CanMatch {
  private authService = inject(AuthService);

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authState$.pipe(
      skipWhile(({ authType }) => authType === null),
      map(({ authType }) => authType === "none")
    );
  }
}
