import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavChoixComponent } from './nav-choix.component';

describe('NavChoixComponent', () => {
  let component: NavChoixComponent;
  let fixture: ComponentFixture<NavChoixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavChoixComponent]
    });
    fixture = TestBed.createComponent(NavChoixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
