import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpsComponent } from './modal-ups.component';

describe('ModalUpsComponent', () => {
  let component: ModalUpsComponent;
  let fixture: ComponentFixture<ModalUpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
