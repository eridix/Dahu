import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeListePictoComponent } from './back-office-liste-picto.component';

describe('BackOfficeListePictoComponent', () => {
  let component: BackOfficeListePictoComponent;
  let fixture: ComponentFixture<BackOfficeListePictoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeListePictoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeListePictoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
