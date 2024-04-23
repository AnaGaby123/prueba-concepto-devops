import {TestBed} from '@angular/core/testing';

import {PurchasePromiseGuard} from './purchase-promise.guard';

describe('PurchasePromiseGuard', () => {
  let guard: PurchasePromiseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PurchasePromiseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
