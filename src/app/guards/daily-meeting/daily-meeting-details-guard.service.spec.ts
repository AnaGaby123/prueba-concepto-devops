import {TestBed} from '@angular/core/testing';

import {DailyMeetingDetailsGuardService} from './daily-meeting-details-guard.service';

describe('DailyMeetingDetailsGuardService', () => {
  let service: DailyMeetingDetailsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyMeetingDetailsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
