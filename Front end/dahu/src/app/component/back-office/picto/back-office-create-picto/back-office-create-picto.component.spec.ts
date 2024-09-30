import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCreatePictoComponent } from './back-office-create-picto.component';

describe('BackOfficeCreatePictoComponent', () => {
  let component: BackOfficeCreatePictoComponent;
  let fixture: ComponentFixture<BackOfficeCreatePictoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeCreatePictoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeCreatePictoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
