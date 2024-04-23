import {TestBed} from '@angular/core/testing';

import {QuotationMainGuard} from './quotation-main.guard';

describe('QuotationMainGuardGuard', () => {
  let guard: QuotationMainGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuotationMainGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
