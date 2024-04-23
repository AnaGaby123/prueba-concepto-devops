import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PaymentOrderListComponent} from './payment-order-list.component';

describe('PaymentOrderListComponent', () => {
  let component: PaymentOrderListComponent;
  let fixture: ComponentFixture<PaymentOrderListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PaymentOrderListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
