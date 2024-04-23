import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OfferAdjustmentDetailsComponent} from './offer-adjustment-details.component';

describe('OfferAdjustmentDetailsComponent', () => {
  let component: OfferAdjustmentDetailsComponent;
  let fixture: ComponentFixture<OfferAdjustmentDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OfferAdjustmentDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferAdjustmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
