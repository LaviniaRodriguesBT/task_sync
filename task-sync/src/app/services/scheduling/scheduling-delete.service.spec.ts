import { TestBed } from '@angular/core/testing';
import { SchedulingDeleteService } from './scheduling-delete.service';
describe('SchedulingDeleteService', () => {
  let service: SchedulingDeleteService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingDeleteService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
