import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuccesAutorizacionComponent } from './modal-succes-autorizacion.component';

describe('ModalSuccesAutorizacionComponent', () => {
  let component: ModalSuccesAutorizacionComponent;
  let fixture: ComponentFixture<ModalSuccesAutorizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSuccesAutorizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSuccesAutorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
