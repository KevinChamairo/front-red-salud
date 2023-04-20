import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarExpedienteComponent } from './cargar-expediente.component';

describe('CargarExpedienteComponent', () => {
  let component: CargarExpedienteComponent;
  let fixture: ComponentFixture<CargarExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarExpedienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
