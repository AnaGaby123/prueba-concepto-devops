import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OfferAdjustmentListComponent} from './offer-adjustment-list.component';

describe('OfferAdjustmentListComponent', () => {
  let component: OfferAdjustmentListComponent;
  let fixture: ComponentFixture<OfferAdjustmentListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OfferAdjustmentListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferAdjustmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
