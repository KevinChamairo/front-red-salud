import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalObservadoComponent } from './modal-observado.component';

describe('ModalObservadoComponent', () => {
  let component: ModalObservadoComponent;
  let fixture: ComponentFixture<ModalObservadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalObservadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalObservadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
