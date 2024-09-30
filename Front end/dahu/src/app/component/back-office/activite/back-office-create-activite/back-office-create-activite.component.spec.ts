import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCreateActiviteComponent } from './back-office-create-activite.component';

describe('BackOfficeCreateActiviteComponent', () => {
  let component: BackOfficeCreateActiviteComponent;
  let fixture: ComponentFixture<BackOfficeCreateActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeCreateActiviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeCreateActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
