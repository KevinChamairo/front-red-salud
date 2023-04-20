import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarAutorizacionesEspecialesComponent } from './generar-autorizaciones-especiales.component';

describe('GenerarAutorizacionesEspecialesComponent', () => {
  let component: GenerarAutorizacionesEspecialesComponent;
  let fixture: ComponentFixture<GenerarAutorizacionesEspecialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarAutorizacionesEspecialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarAutorizacionesEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
