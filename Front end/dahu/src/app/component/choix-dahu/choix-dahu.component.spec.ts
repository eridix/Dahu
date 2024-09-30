import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixDahuComponent } from './choix-dahu.component';

describe('ChoixDahuComponent', () => {
  let component: ChoixDahuComponent;
  let fixture: ComponentFixture<ChoixDahuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoixDahuComponent]
    });
    fixture = TestBed.createComponent(ChoixDahuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
