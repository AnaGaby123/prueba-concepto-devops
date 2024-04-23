import {TestBed} from '@angular/core/testing';

import {CollectionMonitoringDetailsGuard} from './collection-monitoring-details.guard';

describe('CollectionMonitoringDetailsGuard', () => {
  let guard: CollectionMonitoringDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CollectionMonitoringDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
