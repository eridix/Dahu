import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeListeActualiteComponent } from './back-office-liste-actualite.component';

describe('BackOfficeListeActualiteComponent', () => {
  let component: BackOfficeListeActualiteComponent;
  let fixture: ComponentFixture<BackOfficeListeActualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeListeActualiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeListeActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
