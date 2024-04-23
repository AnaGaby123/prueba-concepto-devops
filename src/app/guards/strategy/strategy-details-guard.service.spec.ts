import {TestBed} from '@angular/core/testing';

import {StrategyDetailsGuardService} from './strategy-details-guard.service';

describe('StrategyDetailsGuardService', () => {
  let service: StrategyDetailsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategyDetailsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
