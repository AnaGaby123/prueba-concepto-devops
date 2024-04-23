import {TestBed} from '@angular/core/testing';

import {QuotationDetailsGuardService} from './quotation-details-guard.service';

describe('QuotationDetailsGuardService', () => {
  let service: QuotationDetailsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotationDetailsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
