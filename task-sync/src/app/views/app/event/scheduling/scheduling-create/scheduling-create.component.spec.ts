import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulingCreateComponent } from './scheduling-create.component';
describe('SchedulingCreateComponent', () => {
  let component: SchedulingCreateComponent;
  let fixture: ComponentFixture<SchedulingCreateComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingCreateComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SchedulingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
