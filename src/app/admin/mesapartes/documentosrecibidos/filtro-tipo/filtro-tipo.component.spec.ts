import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTipoComponent } from './filtro-tipo.component';

describe('FiltroTipoComponent', () => {
  let component: FiltroTipoComponent;
  let fixture: ComponentFixture<FiltroTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
