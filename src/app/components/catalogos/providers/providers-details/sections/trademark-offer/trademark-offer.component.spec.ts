import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TrademarkOfferComponent} from './trademark-offer.component';

describe('TradermarkOfferComponent', () => {
  let component: TrademarkOfferComponent;
  let fixture: ComponentFixture<TrademarkOfferComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TrademarkOfferComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademarkOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
