import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AttendReviewPaymentDetailsComponent} from './attend-review-payment-details.component';

describe('AttendReviewPaymentDetailsComponent', () => {
  let component: AttendReviewPaymentDetailsComponent;
  let fixture: ComponentFixture<AttendReviewPaymentDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttendReviewPaymentDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendReviewPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
