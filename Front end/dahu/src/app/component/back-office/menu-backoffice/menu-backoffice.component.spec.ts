import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBackofficeComponent } from './menu-backoffice.component';

describe('MenuBackofficeComponent', () => {
  let component: MenuBackofficeComponent;
  let fixture: ComponentFixture<MenuBackofficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBackofficeComponent]
    });
    fixture = TestBed.createComponent(MenuBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
