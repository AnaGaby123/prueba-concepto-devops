import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ExecutePaymentComponent} from './execute-payment.component';

describe('ExecutePaymentComponent', () => {
  let component: ExecutePaymentComponent;
  let fixture: ComponentFixture<ExecutePaymentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExecutePaymentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
