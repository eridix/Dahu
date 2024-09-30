import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeFormActiviteComponent } from './back-office-form-activite.component';

describe('BackOfficeFormActiviteComponent', () => {
  let component: BackOfficeFormActiviteComponent;
  let fixture: ComponentFixture<BackOfficeFormActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeFormActiviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeFormActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
