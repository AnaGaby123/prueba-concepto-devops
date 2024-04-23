import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrderPurchaseComponent} from './order-purchase.component';

describe('OrderPurchaseComponent', () => {
  let component: OrderPurchaseComponent;
  let fixture: ComponentFixture<OrderPurchaseComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderPurchaseComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
