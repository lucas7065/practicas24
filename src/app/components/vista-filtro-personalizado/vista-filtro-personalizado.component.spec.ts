import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaFiltroPersonalizadoComponent } from './vista-filtro-personalizado.component';

describe('VistaFiltroPersonalizadoComponent', () => {
  let component: VistaFiltroPersonalizadoComponent;
  let fixture: ComponentFixture<VistaFiltroPersonalizadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaFiltroPersonalizadoComponent]
    });
    fixture = TestBed.createComponent(VistaFiltroPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
