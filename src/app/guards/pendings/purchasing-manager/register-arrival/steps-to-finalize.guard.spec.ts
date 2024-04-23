import {TestBed} from '@angular/core/testing';

import {StepsToFinalizeGuard} from './steps-to-finalize.guard';

describe('StepsToFinalizeGuard', () => {
  let guard: StepsToFinalizeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StepsToFinalizeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
