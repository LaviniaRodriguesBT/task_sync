import { TestBed } from '@angular/core/testing';

import { SchedulingUpdateService } from './scheduling-update.service';

describe('SchedulingUpdateService', () => {
  let service: SchedulingUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
