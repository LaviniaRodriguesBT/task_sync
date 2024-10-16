import { TestBed } from '@angular/core/testing';
import { EventReadService } from './event-read.service';
describe('EventReadService', () => {
  let service: EventReadService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventReadService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
