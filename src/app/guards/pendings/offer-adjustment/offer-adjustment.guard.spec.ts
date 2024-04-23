import {TestBed} from '@angular/core/testing';

import {OfferAdjustmentGuard} from './offer-adjustment.guard';

describe('OfferAdjustmentGuard', () => {
  let guard: OfferAdjustmentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OfferAdjustmentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
