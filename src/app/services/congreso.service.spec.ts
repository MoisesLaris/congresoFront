import { TestBed } from '@angular/core/testing';

import { CongresoService } from './congreso.service';

describe('CongresoService', () => {
  let service: CongresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
