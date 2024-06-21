import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingListComponent } from './scheduling-list.component';

describe('SchedulingListComponent', () => {
  let component: SchedulingListComponent;
  let fixture: ComponentFixture<SchedulingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
