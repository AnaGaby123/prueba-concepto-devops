import {TestBed} from '@angular/core/testing';

import {CoreContainerService} from './core-container.service';

describe('CoreContainerService', () => {
  let service: CoreContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
