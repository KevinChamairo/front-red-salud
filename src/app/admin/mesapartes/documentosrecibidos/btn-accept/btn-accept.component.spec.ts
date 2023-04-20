import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAcceptComponent } from './btn-accept.component';

describe('BtnAcceptComponent', () => {
  let component: BtnAcceptComponent;
  let fixture: ComponentFixture<BtnAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
