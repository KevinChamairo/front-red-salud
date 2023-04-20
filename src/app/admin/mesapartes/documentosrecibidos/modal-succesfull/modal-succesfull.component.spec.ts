import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuccesfullComponent } from './modal-succesfull.component';

describe('ModalSuccesfullComponent', () => {
  let component: ModalSuccesfullComponent;
  let fixture: ComponentFixture<ModalSuccesfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSuccesfullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSuccesfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
