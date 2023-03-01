import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { EnvironmentInjector } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { WatchListService } from "./watch-list.service";

const favoriteMoviesMock = [
  {
    title: "test",
  },
  {
    title: "test2",
  },
];

describe("WatchListService", () => {
  let service: WatchListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [WatchListService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EnvironmentInjector).get(WatchListService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("initial state should be an empty array", () => {
    service.movieService$.subscribe(value => expect(value).toEqual([]));
  });

  it("getFavorites", done => {
    const expectedUrl = "/movies";
    const httpController = TestBed.inject(HttpTestingController);
    service.getFavorites();
    service.getFavorites().subscribe({
      next: res => {
        expect(res[0].title).toEqual(favoriteMoviesMock[0].title);
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual("Error");
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);
    req.flush(favoriteMoviesMock);
  });
  it("add sents request to correct url", done => {
    const expectedUrl = "/movies/wanna-see";
    const httpController = TestBed.inject(HttpTestingController);

    service.add("1245");

    httpController.expectOne(expectedUrl);
    done();
  });
  it("getFavoriteId", done => {
    const favoritesIdsMock = ["1", "2", "3", "4"];
    const expectedUrl = "/movies/wanna-see";
    const httpController = TestBed.inject(HttpTestingController);

    service.add("1245");

    service.movieService$.subscribe(state => {
      expect(state).toBe(favoritesIdsMock);
      done();
    });

    const req = httpController.expectOne(expectedUrl);
    req.flush(favoritesIdsMock);
    done();
  });
});
