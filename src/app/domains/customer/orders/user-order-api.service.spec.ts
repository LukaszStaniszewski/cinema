import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { EnvironmentInjector } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { UserApiOrderService } from "./user-order-api.service";

const orderDtoMock = [
  {
    tickets: [
      {
        seat: {
          position: {
            row: "G",
            column: "3",
          },
          taken: false,
          reservation: true,
          status: "standard",
        },
        id: "G3",
        type: "normalny",
        price: 20,
      },
      {
        seat: {
          position: {
            row: "H",
            column: "3",
          },
          taken: false,
          reservation: true,
          status: "standard",
        },
        id: "H3",
        type: "ulgowy",
        price: 12,
      },
      {
        seat: {
          position: {
            row: "J",
            column: "3",
          },
          taken: false,
          reservation: true,
          status: "standard",
        },
        id: "J3",
        type: "normalny",
        price: 20,
      },
    ],
    totalPrice: 52,
    showingPartial: {
      title: "Avatar: Istota Wody",
      day: "06-12-2022",
      image:
        "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
      time: "15:00",
      reservationId: "06-15-a",
    },
  },
];

describe("UserOrderApiService", () => {
  let service: UserApiOrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [UserApiOrderService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EnvironmentInjector).get(UserApiOrderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("getAll correctly maps dto", done => {
    const httpController = TestBed.inject(HttpTestingController);
    const expectedUrl = "/orders/payed";

    service.getAll().subscribe({
      next: result => {
        expect(result[0].tytuł).toBe("Avatar: Istota Wody");
        done();
      },
    });
    const req = httpController.expectOne(expectedUrl);
    req.flush(orderDtoMock);
  });
});
