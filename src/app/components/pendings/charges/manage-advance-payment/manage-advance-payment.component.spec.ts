import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ManageAdvancePaymentComponent} from './manage-advance-payment.component';

describe('ManageAdvancePaymentComponent', () => {
  let component: ManageAdvancePaymentComponent;
  let fixture: ComponentFixture<ManageAdvancePaymentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManageAdvancePaymentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
