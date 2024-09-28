import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInformativoComponent } from './site-informativo.component';

describe('SiteInformativoComponent', () => {
  let component: SiteInformativoComponent;
  let fixture: ComponentFixture<SiteInformativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteInformativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteInformativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
