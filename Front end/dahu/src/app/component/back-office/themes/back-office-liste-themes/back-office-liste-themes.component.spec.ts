import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeListeThemesComponent } from './back-office-liste-themes.component';

describe('BackOfficeListeThemesComponent', () => {
  let component: BackOfficeListeThemesComponent;
  let fixture: ComponentFixture<BackOfficeListeThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeListeThemesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeListeThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
