import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeUpdateActiviteComponent } from './back-office-update-activite.component';

describe('BackOfficeUpdateActiviteComponent', () => {
  let component: BackOfficeUpdateActiviteComponent;
  let fixture: ComponentFixture<BackOfficeUpdateActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeUpdateActiviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeUpdateActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
