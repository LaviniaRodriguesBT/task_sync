import { TestBed } from '@angular/core/testing';
import { TaskUpdateService } from './task-update.service';
describe('TaskUpdateService', () => {
  let service: TaskUpdateService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskUpdateService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
