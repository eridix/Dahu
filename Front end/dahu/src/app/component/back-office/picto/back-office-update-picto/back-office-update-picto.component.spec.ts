import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUpdatePictoComponent } from './back-office-update-picto.component';

describe('BackOfficeUpdatePictoComponent', () => {
  let component: BackOfficeUpdatePictoComponent;
  let fixture: ComponentFixture<BackOfficeUpdatePictoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeUpdatePictoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeUpdatePictoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
