import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { API } from "../../../environments/constants";
import { useNavigate } from "../../shared/inject-hooks";
import { User, UserStateService } from ".";

export type LoginCredentials = {
  email: string;
  password: string;
};
export type LoginDTO = User & {
  role: "customer" | "admin";
};
export type AuthType = "none" | "admin" | "customer" | null;

type AuthState = {
  authType: AuthType;
};
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private auth$$ = new BehaviorSubject<AuthState>({ authType: null });
  private navigate = useNavigate();
  private http = inject(HttpClient);
  private userService = inject(UserStateService);

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

  setGlobalUserState({ role, ...user }: LoginDTO) {
    this.auth$$.next({ authType: role });
    this.userService.set(user);
  }

  login(userCredentials: LoginCredentials) {
    return this.http.post<LoginDTO>(API.LOGIN, userCredentials);
  }

  loginSuccess(loginDTO: LoginDTO) {
    this.setGlobalUserState(loginDTO);
    this.navigate("/");
  }

  logout() {
    this.http.get(API.LOGOUT).subscribe();
    this.auth$$.next({ authType: "none" });
    this.userService.remove();
  }
}
