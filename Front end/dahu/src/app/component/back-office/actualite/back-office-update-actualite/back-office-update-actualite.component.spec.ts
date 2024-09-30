import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUpdateActualiteComponent } from './back-office-update-actualite.component';

describe('BackOfficeUpdateActualiteComponent', () => {
  let component: BackOfficeUpdateActualiteComponent;
  let fixture: ComponentFixture<BackOfficeUpdateActualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeUpdateActualiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeUpdateActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
