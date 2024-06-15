import { TestBed } from '@angular/core/testing';

import { EventsReadService } from './event-read.service';

describe('EventReadService', () => {
  let service: EventsReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
