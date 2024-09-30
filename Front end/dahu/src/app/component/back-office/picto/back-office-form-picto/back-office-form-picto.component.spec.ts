import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeFormPictoComponent } from './back-office-form-picto.component';

describe('BackOfficeFormPictoComponent', () => {
  let component: BackOfficeFormPictoComponent;
  let fixture: ComponentFixture<BackOfficeFormPictoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeFormPictoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeFormPictoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
