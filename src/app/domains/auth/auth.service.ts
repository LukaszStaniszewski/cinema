import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { useNavigate } from "@shared/inject-hooks";
import { BehaviorSubject } from "rxjs";
import { API } from "src/environments/constants";

import { User, UserStateService } from ".";

export type LoginCredentials = {
  email: string;
  password: string;
};
export type LoginDTO = User & {
  role: "customer" | "admin";
};
type AuthType = "none" | "admin" | "customer";

type AuthState = {
  authType: AuthType;
};
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private auth$$ = new BehaviorSubject<AuthState>({ authType: "none" });
  private navigate = useNavigate();
  private http = inject(HttpClient);
  private userService = inject(UserStateService);
  constructor() {
    this.auth$$.subscribe(console.log);
  }

  get authState() {
    return this.auth$$.value;
  }

  get authState$() {
    return this.auth$$.asObservable();
  }

  autoLogin() {
    this.http.get<LoginDTO>(API.LOGIN).subscribe({
      next: user => this.setGlobalUserState(user),

      error: () => this.auth$$.next({ authType: "none" }),
    });
  }

  login(userCredentials: { email: string; password: string }) {
    this.http.post<LoginDTO>(API.LOGIN, userCredentials).subscribe({
      next: user => {
        this.setGlobalUserState(user);
        this.navigate("/");
      },

      error: () => this.auth$$.next({ authType: "none" }),
    });
  }

  logout() {
    this.auth$$.next;
  }

  private setGlobalUserState({ role, ...user }: LoginDTO) {
    this.auth$$.next({ authType: role });
    this.userService.set(user);
  }
}
