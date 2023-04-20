import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeGastoComponent } from './registro-de-gasto.component';

describe('RegistroDeGastoComponent', () => {
  let component: RegistroDeGastoComponent;
  let fixture: ComponentFixture<RegistroDeGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDeGastoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDeGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
