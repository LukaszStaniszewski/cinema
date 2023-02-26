import { TestBed } from "@angular/core/testing";

import { ShowingService } from "./repertuire.store";

describe("ShowingService", () => {
  let service: ShowingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowingService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
