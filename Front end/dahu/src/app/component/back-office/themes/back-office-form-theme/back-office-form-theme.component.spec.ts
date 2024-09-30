import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeFormThemeComponent } from './back-office-form-theme.component';

describe('BackOfficeFormThemeComponent', () => {
  let component: BackOfficeFormThemeComponent;
  let fixture: ComponentFixture<BackOfficeFormThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeFormThemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeFormThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
