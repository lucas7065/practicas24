import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vistaJuegoComponent } from './vistaJuego.component';

describe('JuegoComponent', () => {
  let component: vistaJuegoComponent;
  let fixture: ComponentFixture<vistaJuegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [vistaJuegoComponent]
    });
    fixture = TestBed.createComponent(vistaJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
