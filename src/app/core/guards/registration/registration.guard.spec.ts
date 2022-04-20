import { TestBed, async, inject } from '@angular/core/testing';

import { RegistrationGuard } from './registration.guard';

describe('RegistrationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationGuard]
    });
  });

  it('should ...', inject([RegistrationGuard], (guard: RegistrationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
