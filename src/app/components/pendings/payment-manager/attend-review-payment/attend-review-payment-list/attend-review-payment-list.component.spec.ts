import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AttendReviewPaymentListComponent} from './attend-review-payment-list.component';

describe('AttendReviewPaymentListComponent', () => {
  let component: AttendReviewPaymentListComponent;
  let fixture: ComponentFixture<AttendReviewPaymentListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttendReviewPaymentListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendReviewPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
