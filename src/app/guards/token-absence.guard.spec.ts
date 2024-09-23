import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tokenAbsenceGuard } from './token-absence.guard';

describe('tokenAbsenceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tokenAbsenceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
