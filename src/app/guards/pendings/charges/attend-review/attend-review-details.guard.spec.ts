import {TestBed} from '@angular/core/testing';

import {AttendReviewDetailsGuard} from './attend-review-details.guard';

describe('AttendReviewDetailsGuard', () => {
  let guard: AttendReviewDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AttendReviewDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
