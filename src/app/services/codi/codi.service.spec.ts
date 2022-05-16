import { TestBed } from '@angular/core/testing';

import { CodiService } from './codi.service';

describe('CodiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodiService = TestBed.get(CodiService);
    expect(service).toBeTruthy();
  });
});
