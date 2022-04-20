import { TestBed } from '@angular/core/testing';

import { CodesService } from './codes.service';

describe('CodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodesService = TestBed.get(CodesService);
    expect(service).toBeTruthy();
  });
});
