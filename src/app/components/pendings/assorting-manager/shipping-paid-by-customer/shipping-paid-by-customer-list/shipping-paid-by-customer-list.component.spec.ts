import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShippingPaidByCustomerListComponent} from './shipping-paid-by-customer-list.component';

describe('ShippingPaidByCustomerListComponent', () => {
  let component: ShippingPaidByCustomerListComponent;
  let fixture: ComponentFixture<ShippingPaidByCustomerListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ShippingPaidByCustomerListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPaidByCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
