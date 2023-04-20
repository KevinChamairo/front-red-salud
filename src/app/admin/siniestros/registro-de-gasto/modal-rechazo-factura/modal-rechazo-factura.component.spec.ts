import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRechazoFacturaComponent } from './modal-rechazo-factura.component';

describe('ModalRechazoFacturaComponent', () => {
  let component: ModalRechazoFacturaComponent;
  let fixture: ComponentFixture<ModalRechazoFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRechazoFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRechazoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
