import {TestBed} from '@angular/core/testing';

import {PreProcessDetailsGuardService} from './pre-process-details-guard.service';

describe('PreProcessDetailsGuardService', () => {
  let service: PreProcessDetailsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreProcessDetailsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
