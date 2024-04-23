import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QuoteItemValidateAdjustmentComponent} from './quote-item-validate-adjustment.component';

describe('ItemListComponent', () => {
  let component: QuoteItemValidateAdjustmentComponent;
  let fixture: ComponentFixture<QuoteItemValidateAdjustmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuoteItemValidateAdjustmentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteItemValidateAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
