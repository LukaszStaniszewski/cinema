import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { EnvironmentInjector } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { AuthService, LoginCredentials, LoginDTO, UserStateService } from ".";

const loginDtoMock: LoginDTO = {
  email: "test@test.pl",
  firstName: "Jan",
  secondName: "Kowalski",
  role: "customer",
  phoneNumber: 111111111,
};
const loginCredentialsMock: LoginCredentials = { email: "test@test.pl", password: "12345678" };

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: UserStateService,
          useValue: {
            remove: () => undefined,
            set: () => undefined,
          },
        },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EnvironmentInjector).get(AuthService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("login", done => {
    const expectedUrl = "/auth";
    const httpController = TestBed.inject(HttpTestingController);

    service.login(loginCredentialsMock).subscribe({
      next: res => {
        expect(res).toEqual(loginDtoMock);
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual("Error");
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);
    req.flush(loginDtoMock);
  });

  it("setGlobalUserState", done => {
    service.setGlobalUserState(loginDtoMock);

    service.authState$.subscribe(state => {
      expect(state).toEqual({ authType: "customer" });
      done();
    });
  });

  it("autoLogin", done => {
    const expectedUrl = "/auth";
    const httpController = TestBed.inject(HttpTestingController);

    service.autoLogin();

    service.authState$.subscribe(state => {
      expect(state).toEqual({ authType: "customer" });
      done();
    });

    const req = httpController.expectOne(expectedUrl);
    req.flush(loginDtoMock);
  });
});
