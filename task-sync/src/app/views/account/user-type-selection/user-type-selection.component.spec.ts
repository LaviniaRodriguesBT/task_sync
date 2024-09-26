import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeSelectionComponent } from './user-type-selection.component';

describe('UserTypeSelectionComponent', () => {
  let component: UserTypeSelectionComponent;
  let fixture: ComponentFixture<UserTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTypeSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
