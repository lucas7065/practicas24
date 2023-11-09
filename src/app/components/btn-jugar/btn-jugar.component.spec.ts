import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnJugarComponent } from './btn-jugar.component';

describe('BtnJugarComponent', () => {
  let component: BtnJugarComponent;
  let fixture: ComponentFixture<BtnJugarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnJugarComponent]
    });
    fixture = TestBed.createComponent(BtnJugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
