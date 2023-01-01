import { TestBed } from "@angular/core/testing";

import { CinemaRoomStateService } from "./cinema-room.state.service";

describe("CinemaRoomStateService", () => {
  let service: CinemaRoomStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemaRoomStateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
