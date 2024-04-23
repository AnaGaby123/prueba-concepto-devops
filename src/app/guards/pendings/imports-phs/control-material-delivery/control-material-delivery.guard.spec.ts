import {TestBed} from '@angular/core/testing';

import {ControlMaterialDeliveryGuard} from './control-material-delivery.guard';

describe('ControlMaterialDeliveryGuard', () => {
  let guard: ControlMaterialDeliveryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ControlMaterialDeliveryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
