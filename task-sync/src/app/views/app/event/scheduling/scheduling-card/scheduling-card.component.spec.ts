import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingCardComponent } from './scheduling-card.component';

describe('SchedulingCardComponent', () => {
  let component: SchedulingCardComponent;
  let fixture: ComponentFixture<SchedulingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
