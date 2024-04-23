import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShippingPaidByCustomerComponent} from './shipping-paid-by-customer.component';

describe('ShippingPaidByCustomerComponent', () => {
  let component: ShippingPaidByCustomerComponent;
  let fixture: ComponentFixture<ShippingPaidByCustomerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ShippingPaidByCustomerComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPaidByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
