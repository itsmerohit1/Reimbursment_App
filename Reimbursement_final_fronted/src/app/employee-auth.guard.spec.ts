import { TestBed } from '@angular/core/testing';

import { EmployeeAuthGuard } from './employee-auth.guard';

describe('EmployeeAuthGuard', () => {
  let guard: EmployeeAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployeeAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
