import {TestBed} from '@angular/core/testing';

import {BarcodeGuard} from './barcode.guard';

describe('BarcodeGuard', () => {
  let guard: BarcodeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BarcodeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
