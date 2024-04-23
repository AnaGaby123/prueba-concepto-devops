import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ExecutePaymentCalendarComponent} from './execute-payment-calendar.component';

describe('ExecutePaymentCalendarComponent', () => {
  let component: ExecutePaymentCalendarComponent;
  let fixture: ComponentFixture<ExecutePaymentCalendarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExecutePaymentCalendarComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutePaymentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
