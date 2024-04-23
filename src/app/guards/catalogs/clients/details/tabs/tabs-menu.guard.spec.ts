import {TestBed} from '@angular/core/testing';

import {TabsMenuGuard} from './tabs-menu.guard';

describe('TabsMenuGuard', () => {
  let guard: TabsMenuGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TabsMenuGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
