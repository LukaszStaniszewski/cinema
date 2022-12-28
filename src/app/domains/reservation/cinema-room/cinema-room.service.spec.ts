import { TestBed } from '@angular/core/testing';

import { CinemaRoomService } from './cinema-room.state.service';

describe('CinemaRoomService', () => {
  let service: CinemaRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemaRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
