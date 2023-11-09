import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMargenComponent } from './info-margen.component';

describe('InfoMargenComponent', () => {
  let component: InfoMargenComponent;
  let fixture: ComponentFixture<InfoMargenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoMargenComponent]
    });
    fixture = TestBed.createComponent(InfoMargenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
