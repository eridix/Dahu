import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUpdateThemesComponent } from './back-office-update-themes.component';

describe('BackOfficeUpdateThemesComponent', () => {
  let component: BackOfficeUpdateThemesComponent;
  let fixture: ComponentFixture<BackOfficeUpdateThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeUpdateThemesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeUpdateThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
