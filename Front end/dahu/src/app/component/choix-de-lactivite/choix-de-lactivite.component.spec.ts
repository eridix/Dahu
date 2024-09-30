import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixDeLActiviteComponent } from './choix-de-lactivite.component';

describe('ChoixDeLActiviteComponent', () => {
  let component: ChoixDeLActiviteComponent;
  let fixture: ComponentFixture<ChoixDeLActiviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoixDeLActiviteComponent]
    });
    fixture = TestBed.createComponent(ChoixDeLActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
