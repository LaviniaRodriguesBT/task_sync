import { TestBed } from '@angular/core/testing';
import { TaskDeleteService } from './task-delete.service';
describe('TaskDeleteService', () => {
  let service: TaskDeleteService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDeleteService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
