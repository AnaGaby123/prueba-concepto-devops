import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ListOfferAdjustmentComponent} from './list-offer-adjustment.component';

describe('ListOfferAdjustmentComponent', () => {
  let component: ListOfferAdjustmentComponent;
  let fixture: ComponentFixture<ListOfferAdjustmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ListOfferAdjustmentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfferAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
