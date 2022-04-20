import { TestBed, async, inject } from '@angular/core/testing';

import { AuthPinGuard } from './auth-pin.guard';

describe('AuthPinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPinGuard]
    });
  });

  it('should ...', inject([AuthPinGuard], (guard: AuthPinGuard) => {
    expect(guard).toBeTruthy();
  }));
});
