import {TestBed} from '@angular/core/testing';

import {BrandFormDetailsGuard} from './brand-form-details.guard';

describe('BrandFormDetailsGuard', () => {
  let guard: BrandFormDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BrandFormDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
