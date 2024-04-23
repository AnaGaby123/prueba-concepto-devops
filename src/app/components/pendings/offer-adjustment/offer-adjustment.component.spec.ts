import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OfferAdjustmentComponent} from './offer-adjustment.component';

describe('OfferAdjustmentComponent', () => {
  let component: OfferAdjustmentComponent;
  let fixture: ComponentFixture<OfferAdjustmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OfferAdjustmentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
