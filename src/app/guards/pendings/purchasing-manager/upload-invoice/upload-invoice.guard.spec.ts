import {TestBed} from '@angular/core/testing';

import {UploadInvoiceGuard} from './upload-invoice.guard';

describe('UploadInvoiceGuard', () => {
  let guard: UploadInvoiceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UploadInvoiceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
