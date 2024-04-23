import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeliveryBillingComponent} from './delivery-billing.component';

describe('DeliveryBillingComponent', () => {
  let component: DeliveryBillingComponent;
  let fixture: ComponentFixture<DeliveryBillingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeliveryBillingComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
