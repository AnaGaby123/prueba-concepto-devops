import {TestBed} from '@angular/core/testing';

import {ManageBackOrderGuard} from './manage-back-order.guard';

describe('ManageBackOrderGuard', () => {
  let guard: ManageBackOrderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManageBackOrderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
