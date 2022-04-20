import { TestBed } from '@angular/core/testing';

import { SavingsaccountsService } from './savingsaccounts.service';

describe('SavingsaccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavingsaccountsService = TestBed.get(SavingsaccountsService);
    expect(service).toBeTruthy();
  });
});
