import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeCreateThemesComponent } from './back-office-create-themes.component';

describe('BackOfficeCreateThemesComponent', () => {
  let component: BackOfficeCreateThemesComponent;
  let fixture: ComponentFixture<BackOfficeCreateThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackOfficeCreateThemesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackOfficeCreateThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
