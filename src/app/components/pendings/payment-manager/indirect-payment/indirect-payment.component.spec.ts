import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {IndirectPaymentComponent} from './indirect-payment.component';

describe('DirectPaymentComponent', () => {
  let component: IndirectPaymentComponent;
  let fixture: ComponentFixture<IndirectPaymentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IndirectPaymentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IndirectPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
