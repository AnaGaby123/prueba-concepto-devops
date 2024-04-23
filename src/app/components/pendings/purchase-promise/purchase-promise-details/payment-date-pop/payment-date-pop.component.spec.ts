import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PaymentDatePopComponent} from './payment-date-pop.component';

describe('PayentDatePopComponent', () => {
  let component: PaymentDatePopComponent;
  let fixture: ComponentFixture<PaymentDatePopComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PaymentDatePopComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDatePopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
