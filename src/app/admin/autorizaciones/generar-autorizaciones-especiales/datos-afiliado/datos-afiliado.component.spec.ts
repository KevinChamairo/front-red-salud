import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAfiliadoComponent } from './datos-afiliado.component';

describe('DatosAfiliadoComponent', () => {
  let component: DatosAfiliadoComponent;
  let fixture: ComponentFixture<DatosAfiliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosAfiliadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAfiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
