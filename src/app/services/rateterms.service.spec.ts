import { TestBed } from '@angular/core/testing';

import { RatetermsService } from './rateterms.service';

describe('RatetermsService', () => {
  let service: RatetermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatetermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
