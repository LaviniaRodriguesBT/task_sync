import { TestBed } from '@angular/core/testing';

import { EventDeleteService } from './event-delete.service';

describe('EventDeleteService', () => {
  let service: EventDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
