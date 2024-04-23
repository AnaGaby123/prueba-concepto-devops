import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShippingPaidByCustomerDetailsComponent} from './shipping-paid-by-customer-details.component';

describe('ShippingPaidByCustomerDetailsComponent', () => {
  let component: ShippingPaidByCustomerDetailsComponent;
  let fixture: ComponentFixture<ShippingPaidByCustomerDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ShippingPaidByCustomerDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPaidByCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
