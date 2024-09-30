import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeListeActiviteComponent } from './back-office-liste-activite.component';

describe('BackOfficeListeActiviteComponent', () => {
  let component: BackOfficeListeActiviteComponent;
  let fixture: ComponentFixture<BackOfficeListeActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeListeActiviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeListeActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
