import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaFiltroComponent } from './vista-filtro.component';

describe('VistaFiltroComponent', () => {
  let component: VistaFiltroComponent;
  let fixture: ComponentFixture<VistaFiltroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaFiltroComponent]
    });
    fixture = TestBed.createComponent(VistaFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
