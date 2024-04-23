import {TestBed} from '@angular/core/testing';

import {AttendInvestigationDetailsGuard} from './attend-investigation-details.guard';

describe('AttendInvestigationDetailsGuard', () => {
  let guard: AttendInvestigationDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AttendInvestigationDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
