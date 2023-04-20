import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosrecibidosComponent } from './documentosrecibidos.component';

describe('DocumentosrecibidosComponent', () => {
  let component: DocumentosrecibidosComponent;
  let fixture: ComponentFixture<DocumentosrecibidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosrecibidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosrecibidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
