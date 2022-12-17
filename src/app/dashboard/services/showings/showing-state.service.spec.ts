import { TestBed } from '@angular/core/testing';

import { ShowingStateService } from './showing-state.service';

describe('ShowingStateService', () => {
  let service: ShowingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
