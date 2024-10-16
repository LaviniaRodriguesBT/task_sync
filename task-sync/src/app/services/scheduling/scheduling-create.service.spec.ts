import { TestBed } from '@angular/core/testing';
import { SchedulingCreateService } from './scheduling-create.service';
describe('SchedulingCreateService', () => {
  let service: SchedulingCreateService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingCreateService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
