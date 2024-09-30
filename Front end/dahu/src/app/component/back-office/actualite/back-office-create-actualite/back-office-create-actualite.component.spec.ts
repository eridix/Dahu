import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCreateActualiteComponent } from './back-office-create-actualite.component';

describe('BackOfficeCreateActualiteComponent', () => {
  let component: BackOfficeCreateActualiteComponent;
  let fixture: ComponentFixture<BackOfficeCreateActualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeCreateActualiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeCreateActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
