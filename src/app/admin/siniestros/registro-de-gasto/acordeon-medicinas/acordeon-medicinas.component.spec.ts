import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordeonMedicinasComponent } from './acordeon-medicinas.component';

describe('AcordeonMedicinasComponent', () => {
  let component: AcordeonMedicinasComponent;
  let fixture: ComponentFixture<AcordeonMedicinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcordeonMedicinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcordeonMedicinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
