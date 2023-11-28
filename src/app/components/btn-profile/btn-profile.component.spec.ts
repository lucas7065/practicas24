import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnProfileComponent } from './btn-profile.component';

describe('BtnProfileComponent', () => {
  let component: BtnProfileComponent;
  let fixture: ComponentFixture<BtnProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnProfileComponent]
    });
    fixture = TestBed.createComponent(BtnProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
