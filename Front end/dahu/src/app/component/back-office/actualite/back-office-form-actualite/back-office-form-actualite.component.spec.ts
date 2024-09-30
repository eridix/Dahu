import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeFormActualiteComponent } from './back-office-form-actualite.component';

describe('BackOfficeFormActualiteComponent', () => {
  let component: BackOfficeFormActualiteComponent;
  let fixture: ComponentFixture<BackOfficeFormActualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeFormActualiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeFormActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
