import { TestBed } from '@angular/core/testing';

import { MesadepartesService } from './mesadepartes.service';

describe('MesadepartesService', () => {
  let service: MesadepartesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesadepartesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
