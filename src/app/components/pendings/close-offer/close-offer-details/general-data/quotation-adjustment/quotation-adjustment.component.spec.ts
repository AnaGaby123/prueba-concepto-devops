import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QuotationAdjustmentComponent} from './quotation-adjustment.component';

describe('QuotationAdjustmentComponent', () => {
  let component: QuotationAdjustmentComponent;
  let fixture: ComponentFixture<QuotationAdjustmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuotationAdjustmentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
