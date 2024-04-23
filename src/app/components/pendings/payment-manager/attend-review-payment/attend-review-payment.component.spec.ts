import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AttendReviewPaymentComponent} from './attend-review-payment.component';

describe('AttendReviewPaymentComponent', () => {
  let component: AttendReviewPaymentComponent;
  let fixture: ComponentFixture<AttendReviewPaymentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttendReviewPaymentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendReviewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
