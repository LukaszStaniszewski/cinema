import { TestBed } from '@angular/core/testing';

import { HandleUserErrorService } from './handle-user-error.service';

describe('HandleUserErrorService', () => {
  let service: HandleUserErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleUserErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
