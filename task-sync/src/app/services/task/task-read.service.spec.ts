import { TestBed } from '@angular/core/testing';

import { TaskReadService } from './task-read.service';

describe('TaskReadService', () => {
  let service: TaskReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
