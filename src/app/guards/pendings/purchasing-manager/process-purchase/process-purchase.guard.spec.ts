import {TestBed} from '@angular/core/testing';

import {ProcessPurchaseGuard} from './process-purchase.guard';

describe('ProcessPurchaseGuard', () => {
  let guard: ProcessPurchaseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProcessPurchaseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
