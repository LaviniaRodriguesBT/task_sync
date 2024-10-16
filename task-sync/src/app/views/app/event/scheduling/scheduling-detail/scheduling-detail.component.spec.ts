import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulingDetailComponent } from './scheduling-detail.component';
describe('SchedulingDetailComponent', () => {
  let component: SchedulingDetailComponent;
  let fixture: ComponentFixture<SchedulingDetailComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingDetailComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SchedulingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
