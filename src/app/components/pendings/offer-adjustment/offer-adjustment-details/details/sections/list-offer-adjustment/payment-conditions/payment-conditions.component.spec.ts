import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PaymentConditionsComponent} from './payment-conditions.component';

describe('PaymentConditionsComponent', () => {
  let component: PaymentConditionsComponent;
  let fixture: ComponentFixture<PaymentConditionsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PaymentConditionsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
