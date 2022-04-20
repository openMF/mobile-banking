import { TestBed } from '@angular/core/testing';

import { OfficeService } from './office.service';

describe('OfficeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfficeService = TestBed.get(OfficeService);
    expect(service).toBeTruthy();
  });
});
