import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionfiltroComponent } from './opcionfiltro.component';

describe('OpcionfiltroComponent', () => {
  let component: OpcionfiltroComponent;
  let fixture: ComponentFixture<OpcionfiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionfiltroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionfiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
