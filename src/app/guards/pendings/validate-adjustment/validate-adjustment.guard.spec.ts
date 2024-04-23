import {TestBed} from '@angular/core/testing';

import {ValidateAdjustmentGuard} from './validate-adjustment.guard';

describe('ValidateAdjustmentGuard', () => {
  let guard: ValidateAdjustmentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateAdjustmentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
