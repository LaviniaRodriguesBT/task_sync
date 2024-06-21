import { TestBed } from '@angular/core/testing';

import { SchedulingReadService } from './scheduling-read.service';

describe('SchedulingReadService', () => {
  let service: SchedulingReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
