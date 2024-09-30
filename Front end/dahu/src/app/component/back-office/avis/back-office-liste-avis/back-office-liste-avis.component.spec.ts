import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeListeAvisComponent } from './back-office-liste-avis.component';

describe('BackOfficeListeAvisComponent', () => {
  let component: BackOfficeListeAvisComponent;
  let fixture: ComponentFixture<BackOfficeListeAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeListeAvisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeListeAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
