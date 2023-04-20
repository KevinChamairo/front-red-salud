import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpsOAComponent } from './modal-ups-oa.component';

describe('ModalUpsOAComponent', () => {
  let component: ModalUpsOAComponent;
  let fixture: ComponentFixture<ModalUpsOAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpsOAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpsOAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
