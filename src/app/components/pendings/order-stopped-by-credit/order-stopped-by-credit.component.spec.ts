import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrderStoppedByCreditComponent} from './order-stopped-by-credit.component';

describe('OrderStoppedByCreditComponent', () => {
  let component: OrderStoppedByCreditComponent;
  let fixture: ComponentFixture<OrderStoppedByCreditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderStoppedByCreditComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStoppedByCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
