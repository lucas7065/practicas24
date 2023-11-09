import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescJuegoComponent } from './desc-juego.component';

describe('DescJuegoComponent', () => {
  let component: DescJuegoComponent;
  let fixture: ComponentFixture<DescJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescJuegoComponent]
    });
    fixture = TestBed.createComponent(DescJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
