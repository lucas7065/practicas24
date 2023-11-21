import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniaturaFavoritosComponent } from './miniatura-favoritos.component';

describe('MiniaturaFavoritosComponent', () => {
  let component: MiniaturaFavoritosComponent;
  let fixture: ComponentFixture<MiniaturaFavoritosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniaturaFavoritosComponent]
    });
    fixture = TestBed.createComponent(MiniaturaFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
